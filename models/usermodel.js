const mongoose = require("mongoose");

const passportMongoose = require("passport-local-mongoose").default;

const userSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            unique:true,
            required:true
        },
    role: { type: String, default: "user" }
    }
)

userSchema.plugin(passportMongoose,{usernameField:"email"});

module.exports = mongoose.model("user",userSchema);