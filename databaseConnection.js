const mongoose = require("mongoose");

async function dataBaseConnection() {

    await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
    
                    
    
}

module.exports = dataBaseConnection;