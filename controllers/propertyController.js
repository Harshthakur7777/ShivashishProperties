const Property = require('./../models/propertyModel')
const Review = require('./../models/reviewModel')
module.exports.getHomePage = async(req,res,next)=>{
    const indexData = {
        reviews: await Review.find({}),
        plot : await Property.findOne({type:'plot'}),
        land : await Property.findOne({type:'land'}),
        house : await Property.findOne({type:'house'}),
        office : await Property.findOne({type:'office'})
    }                                        
    res.render('index',{indexData})
}
module.exports.getAllOffices = async (req,res,next)=>{
    let property = await Property.find({type:'office'});
    property.head = 'Offices'
    res.render('property', {property});
}
module.exports.getAllLands = async (req,res,next)=>{
    let property = await Property.find({type:'land'});
    property.head = 'Lands'
    res.render('property', {property});
}
module.exports.getAllHouses = async (req,res,next)=>{
    let property = await Property.find({type:'house'});
    property.head = 'Houses'
    res.render('property', {property});
}
module.exports.getAllPlots = async (req,res,next)=>{
    let property = await Property.find({type:'plot'});
    property.head = 'Plots'
    res.render('property', {property});
}
module.exports.getOneProperty = async(req,res,next)=>{
    const { id }= req.params;
    try{
        const property = await Property.findById({_id:id});
        res.render('show', {property});
    }
    catch{
        res.render('404')
    }
}
module.exports.getReviews = async(req,res,next)=>{
    const reviews = await Review.find({});
    res.render('reviews',{reviews})
}
module.exports.addReview = async (req,res,next)=>{
    if (res.locals.currUser) {
        let profession= req.body.profession;
        let content = req.body.content;
        let image = res.locals.currUser.image;
        let name = res.locals.currUser.username
        const newReview = new Review({ name, profession, content,image });
        
                // Save the user to the database
        await newReview.save();
        req.flash('success','Thanks for your review')
        res.redirect('/home/reviews')
    }
    else{
        req.flash('error','login to add a review')
        res.redirect('/home/reviews')
    }
}
const { isLoggedin } = require('./../middleware')
module.exports.addProperty = async (req,res,next)=>{
   
    try {
       if (res.locals.currUser) {
           let Name = req.body.Name;
           let rate = req.body.rate;
           let location = req.body.location;
           let type = req.body.type;
           let SRB = req.body.SRB;
           let size = req.body.size;
           let additional = req.body.additional;
           let images = [];
           if (req.files['images']) {
               for (let i = 0; i < req.files['images'].length; i++) {
                   images.push(req.files['images'][i].path);  // ✅ Cloudinary URL
               }
           }
   
           let image = req.files['image'] ? req.files['image'][0].path : null;  // ✅ Cloudinary URL
   
   
           let newproperty = new Property({
               Name, rate, location, type, SRB, size, additional, image, images
           });
   
           newproperty.userid = res.locals.currUser._id;
           newproperty.area = req.body.area;
   
           await newproperty.save();
   
           req.flash('success', 'Property has been added successfully');
           res.redirect('/home/sell');
       } else {
           req.flash('error', 'Please login and try again');
           res.redirect('/user/login');
       }
   } catch (err) {
       res.send(err);
   }
}
module.exports.addPropertyForm = (req,res,next)=>{
    res.render('form')
}
module.exports.addReviewForm =(req,res,next)=>{
    if (res.locals.currUser){
        res.render('reviewForm')
    }
    else{
        req.flash('error', 'please login to add reviews')
        res.redirect('/user/login');
    }
}
module.exports.searchProperty = async (req,res,next)=>{
    let prop= req.body.Property;
    let area = req.body.area;
    if(prop=='Property Type' && area=='area'){
        req.flash('error','please select the type of property')
        res.redirect('/home')
    }
    else if(prop!='Property Type' && area=='area'){
        console.log(prop)
        let property = await Property.find({type:prop});    
        console.log(property)
        if(!property && !property[0].area){
            req.flash(`'error',${prop} is not available`)
            res.redirect('/home')
        }
        else{
            property.head = `All ${prop}s in Indore`;   
            res.render('property',{property})
        }
    }
    else if(prop!='Property Type' && area!='area'){
        let property = await Property.find({type:prop,area:area})
        if(!property.area){
            req.flash(`${prop} is not available in ${area}`)
            res.redirect('/home')
        }
        else{
            property.head = `All ${prop}s in ${property.area}`;
            res.render('property',{property})
        }
    }
    else if(prop=='Property Type' && area!='area'){
        let property = await Property.find({area:area})
        console.log(property)
        if(!property.area){
            req.flash('error',`Properties is not available in ${area}`)
            res.redirect('/home')
        }
        else{
        property.head= `All Properties in ${property.area}`;
        res.render('property',{property})
        } 
    }
    
}