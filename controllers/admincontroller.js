
const admin = require("../models/adminmodel");
const product = require("../models/productmodel");


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

async function addingPost(req,res){

    const {title,description,discount,stock,price,category} = req.body;

    const newpost = new product(
        {
            title:title,
            description:description,
            category:category,
            discount:discount,
            price:price,
            stock:stock

        }
    )

    for(let i=0;i<req.files.length;i++){

        newpost.images.push(req.files[i].path);
    }

    await newpost.save();

    req.flash("success","posted successfully");

    res.redirect("/admin/post")
}

async function adminHomePage(req,res){

    
    let allPost = await product.find({});

    // console.log(allPost)
    
    res.render("adminHomepage.ejs",{allPost});

}


module.exports = {adminLoginPage,toAddPost,addingPost,adminHomePage};