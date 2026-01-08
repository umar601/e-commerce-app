const express = require("express");

const userRouter = express.Router();

const {loginPage,signupPage,usersignup} = require("../controllers/usercontroller");

const passport = require("passport");


function asyncWrap(fun){
    return function(req,res,next){
        fun(req,res,next)
        .catch(
            next(err)
        )
    }
}

userRouter
.route("/user/login")
.get(loginPage)
.post(passport.authenticate("user-local",{
    failureFlash:true,
    failureRedirect:"/user/login",
    successFlash:true,
    successRedirect:"/"
}))

userRouter
.route("/user/signup")
.get(asyncWrap(signupPage))
.post(asyncWrap(usersignup))


module.exports = userRouter;