const path = require("path");
const express = require("express");
const passport = require("passport");
const localStorage = require("passport-local");
const methodOverride = require("method-override");
const expressSession = require("express-session");
const cookie_parser = require("cookie-parser");

const admin = require("../models/adminmodel")


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

    


    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new localStorage(admin.authenticate()));

    // passport.use(new localStrategy(client.authenticate()));

    

    passport.serializeUser(admin.serializeUser());
    passport.deserializeUser(admin.deserializeUser());

}


module.exports = middleware;