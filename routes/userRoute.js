const express = require("express");

const userRouter = express.Router();

const {loginPage,signupPage,usersignup,viewPost,viewSpecficPost,addReview,deleteReview} = require("../controllers/usercontroller");

const passport = require("passport");


function asyncWrap(fn) {
    return async function (req, res, next) {
        try {
            await fn(req, res, next);
        } catch (err) {
            next(err); // send error to Express error handler
        }
    };
}


function isLogin(req,res,next){

    if(!req.isAuthenticated()){

        req.flash("error","login first");

        return res.redirect("/user/login");
    }
    else{

        return next();
    }
}


userRouter
.route("/user/login")
.get(loginPage)
.post(passport.authenticate("user-local",{
    failureFlash:true,
    failureRedirect:"/user/login",
    // successFlash:true,
    // successRedirect:"/user/post"
}),((req,res)=>{
    req.flash("success","login successfull");
    res.redirect("/user/post");
}))

userRouter
.route("/user/signup")
.get(asyncWrap(signupPage))
.post(asyncWrap(usersignup))

userRouter
.route("/user/post")
.get(isLogin,asyncWrap(viewPost))

userRouter
.route("/user/post/view/:id")
.get(isLogin,asyncWrap(viewSpecficPost))

userRouter
.route("/user/post/review/:id")
.post(isLogin,asyncWrap(addReview))

userRouter
.delete("/user/post/:id/review/:reviewID",deleteReview)



module.exports = userRouter;