module.exports.saveRedirectUrl = (req,res,next)=>{
  
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}
module.exports.isLoggedIn = (req, res, next) => {
    console.log("Middleware Check - Session Data:", req.session);
    console.log("Middleware Check - Current User:", req.session.currUser);

    if (!req.session.currUser) {
        console.log("User is not logged in, redirecting...");
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "Please log in to access this page");
        return res.redirect('/user/login');
    }

    res.locals.currUser = req.session.currUser; // Pass current user to templates
    next();
};

module.exports.saveUser = ()=>{
    return  res.locals.currUser = req.session.currUser || null;
}