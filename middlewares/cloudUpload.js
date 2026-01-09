const cloudinary = require("../cloudinarConfiguration");
const multer = require("multer");
const {CloudinaryStorage} = require("multer-storage-cloudinary");


const storage = new CloudinaryStorage({

    cloudinary:cloudinary,
    params:{
        folder:"ecommerce",
        allowed_formats:["jpg","jpeg","png"]
    }
})

const uplaod = multer({storage})

module.exports = uplaod;