const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    product:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    }],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"

    },
    quantity:{
        type:Number
    },
    dateOrder:{
        type:Date,
        default:Date.now()
    },
    price:{
        type:Number
    }


})

module.exports=mongoose.model("order",orderSchema);