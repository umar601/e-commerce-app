const {adminLoginPage,toAddPost,addingPost} = require("../controllers/admincontroller");
const express = require("express");
const adminRouter = express.Router();
const passport = require("passport");
const uplaod = require("../middlewares/cloudUpload");



function isLogin(req,res,next){

    if(req.user.role!="admin"){


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
    res.redirect("/admin/post");
}))


adminRouter
.get("/admin/post",isLogin,asyncWrap(toAddPost))
.post("/admin/post",isLogin,uplaod.array("images",10),asyncWrap(addingPost))
    



module.exports = adminRouter;
