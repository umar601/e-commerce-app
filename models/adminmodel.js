const mongoose = require("mongoose");
const passportMongoose = require("passport-local-mongoose").default;

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: { type: String, default: "admin" }
});


//console.log(typeof(passportMongoose));

adminSchema.plugin(passportMongoose, { usernameField: "email" });

module.exports = mongoose.model("admin", adminSchema);
