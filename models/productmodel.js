const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({

    title:{
        type:String
    },
    description:{
        type:String
    },
    category:{
        type:String
    },
    price:{
        type:Number
    },
    stock:{
        type:String
    },
    discount:{
        type:Number,
        default:0
    },
    images:{
        type:Array
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"reviews"
        }
    ]
})


module.exports = mongoose.model("product",productSchema);