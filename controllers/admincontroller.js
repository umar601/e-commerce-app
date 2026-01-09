
const admin = require("../models/adminmodel");


function adminLoginPage(req,res){

    // let newadmin = new admin({
    //     email:"umarshah"
    // })

    // admin.register(newadmin,"123");

    res.render("login.ejs");
}

function toAddPost(req,res){
    
    res.render("adminhomepage.ejs")
}


module.exports = {adminLoginPage,toAddPost};