
const user = require("../models/usermodel");
const product = require("../models/productmodel");
const review = require("../models/reviewmodel");
const order = require("../models/ordermodel");

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

async function viewSpecficPost(req,res){

    let {id} = req.params;

    // console.log("W")

    // console.log(id)

    let post = await product.findById(id).populate({path:"reviews",populate:{path:"owner"}})

    // console.log(post)

    res.render("viewSpecficpost",{post});


}


async function addReview(req,res) {

    let {id} = req.params;

    let postReview = new review({
        content:req.body.review,
        owner:req.user.id,
        rating:req.body.rating
        
    })

    // let userId = req.user.id

    let userToAddReveiw = await user.findById(req.user.id)

    // console.log(userToAddReveiw)

    userToAddReveiw.reviews.push(postReview)
    userToAddReveiw.save()



    let productToAddReview = await product.findById(id)
    // console.log(productToAddReview)
    productToAddReview.reviews.push(postReview)
    productToAddReview.save()
    postReview.save()

    // console.log(postReview)
    // console.log(productToAddReview)

    res.redirect(`/user/post/view/${id}`)
    
}

async function deleteReview(req,res){

    // console.log("R",typeof(req.params.reviewID))
    // console.log("i",typeof(req.params.id))
    

    await review.findByIdAndDelete(req.params.reviewID);   //deleteing review 
    await product.findByIdAndUpdate(                      //deleteing from product
        req.params.id,
        {
            $pull:
            {
                reviews:req.params.reviewID
            }
        }
    )

     await user.findByIdAndUpdate(                      //deleteing from user
        req.user.id,
        {
            $pull:
            {
                reviews:req.params.reviewID
            }
        }
    )

    req.flash("success","delete sucessfully ");

    res.redirect(`/user/post/view/${req.params.id}`)

}


async function placeOrder(req,res){

    let orderPost = await product.findById(req.params.id);

    // console.log(orderPost)
 
    res.render("orderPage.ejs",{orderPost});
    
}

async function savingOrder(req,res){

     let addingProduct=await product.findById(req.params.id);


    let addingOrder = new order(
        {
            product:addingProduct,
            owner:req.user.id,
            quantity:req.body.quantity,
            price:addingProduct.price,
            paymentMode:req.body.payment


        }
    )

    await addingOrder.save();
    req.flash("success","order saved");

    res.redirect(`/user/post/view/${req.params.id}`)

}


module.exports = {loginPage,signupPage,usersignup,viewPost,viewSpecficPost,addReview,deleteReview,placeOrder,savingOrder}