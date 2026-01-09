const {adminLoginPage,toAddPost,addingPost} = require("../controllers/admincontroller");
const express = require("express");
const adminRouter = express.Router();
const passport = require("passport");
const uplaod = require("../middlewares/cloudUpload");



function isLogin(req,res,next){

    if(!req.isAuthenticated()){

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
        successRedirect: "/admin/post",
        successFlash: "Welcome admin!"
    }))


adminRouter
.get("/admin/post",asyncWrap(toAddPost))
.post("/admin/post",uplaod.array("images",10),asyncWrap(addingPost))
    



module.exports = adminRouter;
