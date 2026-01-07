const express = require("express");

const app = express();

const port = 8080;

const dataBaseConnection = require("./databaseConnection");
const middleware = require("./middlewares/middleware");
const adminRouter = require("./routes/adminRoute");


dataBaseConnection()
.then(()=>{
    console.log("data base connection sucessful.");
})
.catch((err)=>{
    console.log(err);
})



middleware(app);


// app.use((err,req,res,next)=>{

//     console.log("error");
// })


// console.log(adminRouter.adminLogin);


app.use("/",adminRouter);

app.use("/",(req,res)=>{
    res.send("workd")
});


app.listen(port,()=>{

    console.log(`port is listening at ${port}`);
})