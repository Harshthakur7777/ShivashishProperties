const { generateOTP, sendOTP } = require('../utils/otp');
const { ConversationRelay, ReferSip } = require('twilio/lib/twiml/VoiceResponse');
const User = require('../models/user')
const bcrypt = require('bcrypt');
const { saveUser, isLoggedin }= require('./../middleware')
const OTP = require('./../utils/otp');
const Property = require('../models/propertyModel');
const { ModuleDataManagementListInstance } = require('twilio/lib/rest/marketplace/v1/moduleDataManagement');
module.exports.getLoginForm = async(req,res,next)=>{
    res.render('login')
}
module.exports.Login = async(req,res,next)=>{
    let {phone,password} = req.body;
    let user = await User.findOne({phone:phone})
    if(user){
        const isMatch = await bcrypt.compare(password, user.passkey);
        if(isMatch){
            req.session.currUser = user;
            res.locals.currUser = user;
            let redirectUrl = res.locals.redirectUrl || "/home";
            req.flash("success", "login successfully")
            res.redirect(redirectUrl);
        }
        else{
            req.flash("error", "your password is incorrect")
            res.redirect('/user/login')
        }
    }
    else{
        req.flash("error", "Account not found Please create an account")
        res.redirect('/user/login')
    }
    /*
    next();
    */
}
let otpStore= {};
module.exports.signUp = async (req, res, next) => {
  try {
      const bcrypt = require('bcrypt');
      const { phone, username, email, password } = req.body;

      if (!email) return res.status(400).send({ message: 'Email is required.' });

      // Check if user already exists
      const existingUser = await User.findOne({
        $or: [
          { email },
          { phone }
        ]
      });
      if (existingUser) {
          req.flash('error', 'User already exists.');
          return res.redirect('/user/signup');
      }

      // Generate OTP and store user data
      const otp = generateOTP();
      const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

      otpStore[email] = { phone, username, passkey: password, otp, expiresAt };

      // Send OTP email
      await sendOTP(email, otp);

      // Render OTP verification page
      return res.render('otpver', { email });

  } catch (err) {
      console.error("Sign-up error:", err);
      req.flash('error', 'Sign-up failed. Please try again.');
      return res.redirect('/user/signup');
  }
};
module.exports.verifyOtp = async (req, res, next) => {
  try {
      const { one, two, three, four, five, six } = req.body;
      const otp = `${one}${two}${three}${four}${five}${six}`;

      if (!otp) {
          req.flash('error', 'OTP is required.');
          return res.redirect('/user/login');
      }

      // ✅ Get email from OTP store
      const storedEmail = Object.keys(otpStore)[0]; // Fetch the first stored email
      if (!storedEmail || !otpStore[storedEmail]) {
          req.flash('error', 'OTP not requested or expired.');
          return res.redirect('/user/login');
      }

      const storedOtpData = otpStore[storedEmail];

      // ✅ Validate OTP and expiration
      if (otp !== storedOtpData.otp || Date.now() > storedOtpData.expiresAt) {
          req.flash('error', 'Invalid or expired OTP.');
          delete otpStore[storedEmail]; // Remove expired OTP entry
          return res.redirect('/user/signup');
      }

      // ✅ Ensure email is passed correctly to User model
      const newUser = new User({
          phone: storedOtpData.phone,
          username: storedOtpData.username,
          email: storedEmail, // ✅ Use correct email
          passkey: storedOtpData.passkey,
      });

      let user = await newUser.save(); // Save verified user
      delete otpStore[storedEmail]; // Clear OTP store after success
      console.log(user)
      // ✅ Set session manually
      req.session.currUser = {
          _id: user._id,
          username: user.username,
          email: user.email,
      };

      req.flash('success', 'Welcome to Shivashish Properties!');
      return res.redirect('/home');

  } catch (err) {
      console.error("Error in OTP verification:", err);
      req.flash('error', 'Error logging in');
      return res.redirect('/user/login');
  }
};

module.exports.getSignupForm = (req,res,next)=>{
    res.render('signup')
}
module.exports.logout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        req.flash('error','Could not log out')
        req.redirect('/home')
      }
      res.redirect('/user/login'); // Redirect to the login page
    });
}
module.exports.getUserProfile= async(req,res,next)=>{
  const id = req.params.profile;
  let properties = [];
  properties=await Property.find({userid:id})
  const user = await User.findById(id);
  console.log('user', user)

  res.render('profile',{ user , properties})
}
module.exports.getEditFrom = async(req,res,next)=>{
  const id = req.params.profile;
  const user = await User.findById(id);
  res.render('edit',{user})
}
module.exports.updateUserProfile =  async(req,res,next)=>{
  try {
    const { username, phone, email } = req.body;
    const id = req.params.profile;
    
    // Get the Cloudinary image URL directly from req.file
    let imageUrl = req.file ? req.file.path : undefined;

    // Update the user document, setting the image URL if one was uploaded
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, phone, email, ...(imageUrl && { image: imageUrl }) },
      { new: true }
    );
    req.flash('success','profile updated successfully')
    res.redirect(`/user/${id}`);
  } catch (err) {
    req.flash('error', 'something went wrong')
    
    next(err);
  }
}
module.exports.deleteProperty =  async(req,res,next)=>{
  try {
    const pid = req.params.property; // Property ID
    const uid = req.params.profile; // User ID

    // Delete the property using its ID
    await Property.deleteOne({ _id: pid });

    // Redirect to the user's profile page
    res.redirect(`/user/${uid}`);
} catch (error) {
   req.flash('error','Error deleting prorperty')
   res.redirect('/home') // Pass error to the error-handling middleware
}
}
module.exports.getForgetForm=(req,res,next)=>{
    res.render('forget')
}
module.exports.setNewPassword = async(req,res,next)=>{
      const email = req.body.email;
      const password = req.body.password;
      const cpassword = req.body.cpassword;
      let user = await User.findOne({email:email});
      if(!user){
        req.flash('error','user does not exist');
        res.redirect('/user/login')
      }
      if(password!=cpassword){
        req.flash('error',"password is not matching");
        res.redirect('/user/forgetpassword')
      }

      let pass = await bcrypt.hash(password, 10);
      const saveUser= await User.findOneAndUpdate({email},{passkey:pass},{new:true})
      
      req.flash('success','password updated successfully');
      res.redirect('/user/login')
}