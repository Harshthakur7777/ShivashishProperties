const express = require('express');
const app = express();
app.use(express.json());
var DataReview = require('./data/reviews')
var reviews = DataReview.array;
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
const ejsMate = require('ejs-mate')
const path = require('path');
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname,"public")))
app.engine('ejs', ejsMate)
const Home = require('./router/home')


app.use('/home',Home);

app.get('/',(req,res,next)=>{
    res.render('index',{reviews})
})
app.get('/about',(req,res,next)=>{
    res.render('about')
})

app.get('/propertyList',(req,res,next)=>{
    res.render('property-list');
})
app.get('/propertyType',(req,res,next)=>{
    res.render('property-type');
})
app.get('/testimonial',(req,res,next)=>{
    res.render('testimonial')
})

app.get('/404',(req,res,next)=>{
    res.render('404')
})
app.get('/addd', (req,res,next)=>{
    res.render('form.ejs')
})
app.get('/contact',(req,res,next)=>{
    res.render('contact')
})
app.post('/addone',(req,res,next)=>{
    console.log(JSON.parse(req.body.name));
})
app.all('*', (req,res,next)=>{
    res.render('404')
})

app.listen(8080,()=>{
    console.log('app is listening on port 8080')
})