const path = require("path");
const express = require("express");
const passport = require("passport");
const localStorage = require("passport-local");
const methodOverride = require("method-override");
const expressSession = require("express-session");
const cookie_parser = require("cookie-parser");
const flash = require("connect-flash");

const admin = require("../models/adminmodel")
const user = require("../models/usermodel");


function middleware(app){

    app.set("view engine","ejs");
    app.set("views",path.join(__dirname,"../views"));

    app.use(express.static(path.join(__dirname,"../public")));

    app.use(express.urlencoded({extended:true}));
    app.use(express.json());

    app.use(methodOverride("_method"));


    app.use(expressSession({

        secret:"secret",
        resave:true,
        saveUninitialized:false,
        cookie:{
            expires:Date.now()*7+24+60+60+1000,
            maxAge:Date.now()*7+24+60+60+1000,
            httpOnly:true

        }
    }))


    
  //  app.use(expressSession(
  //   {secret:"secret",
  //   resave:false,
  //   saveUninitialized:true,
  //   cookie:{
  //     expires:Date.now()+7*24*60*60*1000,  //mean after one week
  //   maxAge:Date.now()+7*24*60*60*1000,
  //   httpOnly:true  //for cross scripting attacks

  //   }
  // }));

    app.use(flash());


    app.use(passport.initialize());
    app.use(passport.session());

    
    passport.use("admin-local", new localStorage({usernameField:"email"},admin.authenticate()));

    passport.use("user-local",new localStorage({usernameField:"email"},user.authenticate()));


    passport.serializeUser((userObj,done)=>{
        const type = userObj instanceof admin ? "admin" :"user"
        done(null,{id:userObj._id,type})
    });

    passport.deserializeUser(async (userObj,done)=>{

        try{

        if(userObj.type=="admin"){
            const adminUser = await admin.findById(userObj.id);
            return done(null,adminUser);
        }
        else{
            const normalUser = await user.findById(userObj.id);
            return done(null,normalUser)

        }

    }
    catch(err){
        done(err);
    }
    })
   

//     passport.serializeUser((userObj, done) => {

//     const type = userObj instanceof admin ? "admin" : "user";
//     done(null, { id: userObj._id, type });
// });

// passport.deserializeUser(async (obj, done) => {
//     try {
//         if (obj.type === "admin") {
//             const adminUser = await admin.findById(obj.id);
//             return done(null, adminUser);
//         } else {
//             const normalUser = await user.findById(obj.id);
//             return done(null, normalUser);
//         }
//     } catch (err) {
//         done(err);
//     }
//});


    app.use((req,res,next)=>{

        res.locals.success = req.flash("success");
        res.locals.faliure = req.flash("error");
        res.locals.user = req.user;
        // console.log(req.user)
        next();

    })

}


module.exports = middleware;