const mongoose = require("mongoose");

const reviwSchema = new mongoose.Schema({

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    content:{
        type:String
    },
    rating:{
        type:Number
    }

})

module.exports = mongoose.model("review",reviwSchema);