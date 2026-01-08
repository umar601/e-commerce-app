const mongoose = require("mongoose");

const passportMongoose = require("passport-local-mongoose").default;

const userSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            unique:true
        }
    }
)

userSchema.plugin(passportMongoose,{usernameField:"email"});

module.exports = mongoose.model("user",userSchema);