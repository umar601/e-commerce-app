
const admin = require("../models/adminmodel");


function adminLoginPage(req,res){

    // let newadmin = new admin({
    //     email:"umarshah"
    // })

    // admin.register(newadmin,"123");

    res.render("login.ejs");
}

function toAddPost(req,res){
    
    res.render("adminAddPost.ejs")
}

function addingPost(req,res){

    console.log(req.body)

    res.send("rec")
}


module.exports = {adminLoginPage,toAddPost,addingPost};