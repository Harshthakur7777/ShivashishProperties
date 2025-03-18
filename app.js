const express = require('express');
const app = express();
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
const ejsMate = require('ejs-mate')
const path = require('path');
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname,"public")))
app.engine('ejs', ejsMate)
const sessions = require('express-session'); 
const flash = require('connect-flash'); 

const Home = require('./router/home')
const Admin = require('./router/admin')
const mongoose = require("mongoose");
const userRouter = require('./router/user')
const User  = require('./models/user')
const propertyModel = require('./models/propertyModel')
 const mongoURI = "mongodb+srv://shivashishproperties:Incorrect%40321@cluster0.rg7cp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

 mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => console.error("❌ MongoDB connection error:", err));
 const sessionOptions = {
    secret: 'your-secret-key', // Replace with a strong secret key
    resave: false, // Don't resave the session if it hasn't been modified
    saveUninitialized: false, // Don't save uninitialized sessions
    cookie: { 
        secure: false, // Use true if your app is served over HTTPS
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days in milliseconds
    }
  }
  app.use(sessions(sessionOptions));
  app.use((req, res, next) => {
      if (req.session.redirectUrl) {
          res.locals.redirectUrl = req.session.redirectUrl;
      }
      next();
  });
  app.use(flash())
  app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error = req.flash("error")
    res.locals.currUser = req.session.currUser;
    next();
  })
 


  // Middleware to set flash messages in the response locals
 
app.use('/user',userRouter)
app.use('/home',Home);
app.use('/admin',Admin)
app.get('/',async(req,res,next)=>{
    const indexData = {
        reviews: await reviewModel.find({}),
        plot : await propertyModel.findOne({type:'plot'}),
        land : await propertyModel.findOne({type:'land'}),
        house : await propertyModel.findOne({type:'house'}),
        office : await propertyModel.findOne({type:'office'})
    }
    res.render('index',{ indexData })
})
app.get('/about',(req,res,next)=>{
    res.render('about')
})


app.get('/404',(req,res,next)=>{
    res.render('404')
})
app.get('/addd', (req,res,next)=>{
    res.render('form.ejs')
})

app.post('/addone',(req,res,next)=>{
    console.log(JSON.parse(req.body.name));
})
app.all('*', (req,res,next)=>{
    res.render('404')
})
User.create()
app.listen(8000,()=>{
    console.log('app is listening on port 8000')
})