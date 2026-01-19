const {adminLoginPage,toAddPost,addingPost,adminHomePage} = require("../controllers/admincontroller");
const express = require("express");
const adminRouter = express.Router();
const passport = require("passport");
const uplaod = require("../middlewares/cloudUpload");



function isLogin(req,res,next){

    console.log(req.user)

    if(!req.user||req.user.role!="admin"){

    // console.log(req.user.role)
   req.flash("error","login first");

        return res.redirect("/admin/login");
    }
    else{

        return next();
    }
}


function asyncWrap(fn) {
    return async function (req, res, next) {
        try {
            await fn(req, res, next);
        } catch (err) {
            next(err);
        }
    };
}




adminRouter
.route("/admin/login")
.get(adminLoginPage)
.post(passport.authenticate("admin-local", {
        failureRedirect: "/admin/login",
        failureFlash: true,
        // successRedirect: "/admin/post",
        // successFlash: "Welcome admin!"
}),((req,res)=>{
    req.flash("success","login successfull");
    res.redirect("/admin/homepage");
}))


adminRouter
.get("/admin/post",isLogin,asyncWrap(toAddPost))
.post("/admin/post",isLogin,uplaod.array("images",10),asyncWrap(addingPost))

adminRouter
.get("/admin/homepage",isLogin,asyncWrap(adminHomePage))
    



module.exports = adminRouter;
