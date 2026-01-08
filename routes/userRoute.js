const express = require("express");

const userRouter = express.Router();

const {loginPage,signupPage,usersignup} = require("../controllers/usercontroller");

const passport = require("passport");

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
.get(signupPage)
.post(usersignup)


module.exports = userRouter;