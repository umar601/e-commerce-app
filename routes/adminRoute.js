const {adminLoginPage} = require("../controllers/admincontroller");
const express = require("express");
const adminRouter = express.Router();
const passport = require("passport");



function isLogin(req,res,next){

    if(!req.isAuthenticated()){

        req.flash("error","login first");

        return res.redirect("/admin/login")
    }
    else{

        next();
    }
}


function asyncWrap(fun){
    return function(req,res,next){
        fun(req,res,next)
        .catch(
            next(err)
        )
    }
}


adminRouter
.route("/admin/login")
.post(passport.authenticate("admin-local", {
        failureRedirect: "/admin/login",
        failureFlash: true,
        successRedirect: "/",
        successFlash: "Welcome admin!"
    }))
.get(adminLoginPage)

// adminRouter.get("/admin/post",isLogin,(req,res)=>{
//     res.send("add");
// })


module.exports = adminRouter
