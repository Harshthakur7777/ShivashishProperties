const express =require('express');
const router = express.Router({mergeParams:true})
const userController = require('./../controllers/userControllers');
const User = require('../models/user');
const passport = require('passport')
const { saveRedirectUrl }= require('./../middleware')
  
router.use(express.urlencoded({ extended: true }));
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./../utils/cloudinary'); 

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        if (!file.mimetype.startsWith('image/')) {
            throw new Error('Only images are allowed!');
        }

        return {
            folder: 'newPropertyImages', // ✅ Cloudinary folder
            format: file.mimetype.split('/')[1], // ✅ Get format dynamically
            public_id: Date.now() + '-' + file.originalname, // ✅ Unique filename
        };
    },
})

const uploads = multer({ storage: storage });

router.route('/login')
      .get(userController.getLoginForm)  
      .post(saveRedirectUrl,userController.Login);
router.route('/signup')
      .get(userController.getSignupForm)  
      .post(userController.signUp)
router.route('/verify')
      .post(userController.verifyOtp)
router.route('/logout')
      .get(userController.logout)
router.route('/edit/:profile')
      .get(userController.getEditFrom)
      .post(uploads.single('image') ,userController.updateUserProfile)
router.route('/forgetpassword')
      .post(userController.setNewPassword)
      .get(userController.getForgetForm)      
router.route('/:profile')
      .get(userController.getUserProfile)
router.route('/:profile/:property') 
      .post(userController.deleteProperty)
module.exports = router;