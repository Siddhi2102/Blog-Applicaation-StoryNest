 const path =require("path");
 const express=require('express');
 const mongoose=require("mongoose");
const cookieParser= require('cookie-parser');

 const userRoute=require('./routes/user');
const { checkForAuthenticationCoookie } = require("./middlewares/authentication");

 const app=express();
 const PORT=8000;

 mongoose.connect('mongodb+srv://agrawalsiddhi2102:FJhRXLydS8ECGf52@blog.xoq1z.mongodb.net/?retryWrites=true&w=majority&appName=Blog').then((e)=>console.log("MongoDB Connected"));

 app.set("view engine","ejs");
 app.set("views",path.resolve("./views"));

 app.use(express.urlencoded({extended:false}));
 app.use(cookieParser());
 app.use(checkForAuthenticationCoookie("token"));

 app.get('/', async(req,res)=>{
    res.render("home",{
      user:req.user,
    });
 })

 app.use("/user",userRoute);

 app.listen(PORT,()=>console.log(`Server started at PORT:${PORT}`));