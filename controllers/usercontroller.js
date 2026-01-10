
const user = require("../models/usermodel");
const product = require("../models/productmodel");

function loginPage (req,res){
    
    res.render("userlogin.ejs");
}

function signupPage (req,res){
    
    res.render("usersignup.ejs");
}

async function usersignup(req,res) {

    const {email,password} = req.body;

    let newUser = new user(
        {
            email:email
        }
    )

    await user.register(newUser,password).then(()=>{
        req.flash("success","signup successful");
        req.login(newUser,(err)=>{
            if(err){
                res.redirect("/user/login");
            }
            else{
            req.flash("success","login successful");
            res.redirect("/");

            }
        }).catch((err)=>{
            req.flash("error","failed signup");
            console.log(err);
        })
    })
    
}


async function viewPost(req,res){

    let allPost = await product.find({});

    res.render("viewPostUser.ejs",{allPost});

}


module.exports = {loginPage,signupPage,usersignup,viewPost}