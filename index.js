const express = require("express");

const app = express();

const port = 8080;

const dataBaseConnection = require("./databaseConnection");
const middleware = require("./middlewares/middleware");


dataBaseConnection()
.then(()=>{
    console.log("data base connection sucessful.");
})
.catch((err)=>{
    console.log(err);
})



middleware(app);


app.use("/",(req,res)=>{

    res.send("working");
})


app.listen(port,()=>{

    console.log(`port is listening at ${port}`);
})