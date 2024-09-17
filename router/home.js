const express = require('express');
const router = express.Router();
var DataOffice = require('./../data/office')   
var DataPlot = require('./../data/plots')   
var DataLand = require('./../data/lands')   
var DataHouse = require('./../data/house')   
var DataReview = require('./../data/reviews')   
router.use(express.json());
 
// For parsing application/x-www-form-urlencoded
router.use(express.urlencoded({ extended: true }));
const multer = require('multer');
const uniqid = require('uniqid');
const path = require('path');
const { rmdirSync } = require('fs');
const uploads = multer({
      storage: multer.diskStorage({
          destination: function (req, file, cb) {
              cb(null, `./public/img`);
          },
          filename: function (req, file, cb) {
              cb(null, uniqid() + path.extname(file.originalname));
          },
      }),
  });

var reviews = DataReview.array;
var offices = DataOffice.array;
var plots = DataPlot.array;
var lands = DataLand.array;
var houses = DataHouse.array 

router.get('/',(req,res,next)=>{
    res.render('index',{reviews})
})
router.get('/offices-in-indore/:id',(req,res,next)=>{
    const { id }= req.params;
    if(offices.length<id){
        res.render('404')
    }
    const property = offices[id-1];
    res.render('show.ejs', {property});
})
router.get('/lands-in-indore/:id',(req,res,next)=>{
    
    const { id }= req.params;
    if(lands.length<id){
        res.render('404')
    }
    const property = lands[id-1];
    res.render('show.ejs', {property});
})
router.get('/plots-in-indore/:id',(req,res,next)=>{
    const { id }= req.params;
    if(plots.length<id){
        res.render('404')
    }
    const property = plots[id-1];
    res.render('show.ejs', {property});
})
router.get('/houses-in-indore/:id',(req,res,next)=>{
    const { id }= req.params;
    if(houses.length<id){
        res.render('404')
    }
    const property = houses[id-1];
    res.render('show.ejs', {property});
})
router.post('/addReview', uploads.single('image') ,(req,res,next)=>{
    let newReview = {};
    newReview.name = req.body.name;
    newReview.profession = req.body.profession;
    newReview.content = req.body.review;
    newReview.image = '/img/'+req.file.filename;
    reviews.push(newReview);
    res.redirect('/home/reviews')
})
router.post('/addone',uploads.fields([{name:'image1'},{name:'image2'},{name:'image3'},{name:'image4'},{name:'image5'}]), (req,res,next)=>{
    let newproperty = {};
    newproperty.Name = req.body.Name;
    newproperty.area = req.body.area;
    newproperty.rate = req.body.rate;
    newproperty.location = req.body.location;
    newproperty.type = req.body.type;
    newproperty.SRB = req.body.SRB;
    newproperty.size = req.body.size;
    newproperty.additional = req.body.additional;
    newproperty.image = '/img/'+req.files.image1[0].filename;
    let arr = ['/img/'+req.files.image1[0].filename,'/img/'+req.files.image2[0].filename,'/img/'+req.files.image3[0].filename,'/img/'+req.files.image4[0].filename,'/img/'+req.files.image5[0].filename]
    newproperty.images = arr;
    var property = "";
    if(newproperty.type=="Office"){
        newproperty.index = offices.length+1;
        offices.push(newproperty);
        property = offices;
        res.redirect('/home/offices')
    }
    else if(newproperty.type=="Plot"){
        newproperty.index = plots.length+1;
        plots.push(newproperty);
        property = plots;
        res.redirect('/home/plots')
    }
    else if(newproperty.type=="Land"){
        newproperty.index = lands.length+1;
        lands.push(newproperty);
        property = lands;
        res.redirect('/home/lands')
    }
    else{
        newproperty.index = houses.length+1;
        houses.push(newproperty);
        property = houses;
        res.redirect('/home/houses')
    }
})
router.get('/reviews',(req,res,next)=>{
    res.render('reviews',{reviews})
})
router.get('/offices-in-indore', (req,res,next)=>{
    let property = offices
    res.render('offices', {property})
})            
router.get('/houses-in-indore', (req,res,next)=>{
    let property = houses;
    res.render('houses', {property})
})
router.get('/plots-in-indore', (req,res,next)=>{
    let property = plots
    res.render('plots', {property})    
})
router.get('/lands-in-indore', (req,res,next)=>{
    let property = lands;
    res.render('lands', {property})
})
router.get('/add-in-indore', (req,res,next)=>{
    res.render('form')
})
router.get('/addreview', (req,res)=>{
    res.render('reviewForm')
})
router.post('/search', (req,res,next)=>{
    let prop= req.body.Property;
    let area = req.body.area;
    let property = fun(prop,area)
    if(prop=="Plot"){
        res.render('plots',{property})
    }
    else if(prop=="Office"){
        res.render('offices',{property})
    }
    else if(prop=="Lands"){
        res.render('lands', {property})
    }
    else if(prop=="House"){
        res.render('houses', {property})
    }
   
})
function fun(prop,area){
    let arr = []
    if(prop=="Plot"){
        for(plot of plots){
            if(plot.area==area){
                arr.push(plot)
            }
        }
    }
    else if(prop=="Office"){
        for(office of offices){
            if(office.area==area){
                arr.push(office)
            }
        }
    }
    else if(prop=="Land"){
        for(Land of lands){
            if(Land.area==area){
                arr.push(Land)
            }
        }
    }
    else if(prop=="House"){
        for(House of houses){
            if(House.area==area){
                arr.push(House)
            }
        }
    }
    return arr;
}
router.all('*',(req,res,next)=>{
    res.render('404')
})
module.exports = router;