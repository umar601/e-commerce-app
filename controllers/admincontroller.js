
const admin = require("../models/adminmodel");


function adminLoginPage(req,res){

    // let newadmin = new admin({
    //     email:"umarshah"
    // })

    // admin.register(newadmin,"123");

    res.render("login.ejs");
}


module.exports = {adminLoginPage};