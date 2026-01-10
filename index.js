require("dotenv").config();

const express = require("express");

const app = express();

const port = 8080;

const dataBaseConnection = require("./databaseConnection");
const middleware = require("./middlewares/middleware");
const adminRouter = require("./routes/adminRoute");
const userRouter = require("./routes/userRoute");
const errorClass = require("./errorClass");


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
app.use("/",userRouter);

// app.use("/",(req,res)=>{
//    // console.log(req.user)
//     res.render("p")
// });

app.use(/.*/, (req, res,next) => {
    next(new errorClass(404,"pagenot found"))
});

app.use((err, req, res, next) => {
    if (!(err instanceof errorClass)) {
        err = new errorClass(err.status || 500, err.message || "Something went wrong");
    }


    res.status(err.status).render("error", { message: err.message,user:"user"});
});



app.listen(port,()=>{

    console.log(`port is listening at ${port}`);
})