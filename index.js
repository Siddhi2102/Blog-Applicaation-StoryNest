 const path =require("path");
 const express=require('express');
 const mongoose=require("mongoose");
const cookieParser= require('cookie-parser');

const Blog=require('./models/blog')

const userRoute=require('./routes/user');
const blogRoute=require('./routes/blog');




const { checkForAuthenticationCoookie } = require("./middlewares/authentication");

 const app=express();
 const PORT=8000;

 mongoose.connect('mongodb+srv://agrawalsiddhi2102:FJhRXLydS8ECGf52@blog.xoq1z.mongodb.net/?retryWrites=true&w=majority&appName=Blog').then((e)=>console.log("MongoDB Connected"));

 app.set("view engine","ejs");
 app.set("views",path.resolve("./views"));

 app.use(express.urlencoded({extended:false}));
 app.use(cookieParser());
 app.use(checkForAuthenticationCoookie("token"));
 app.use(express.static(path.resolve('./public')));

 app.get('/', async(req,res)=>{
  const allBlogs=await Blog.find({});
    res.render("home",{
      user:req.user,
      blogs:allBlogs,
    });
 })

 app.use("/user",userRoute);
 app.use("/blog",blogRoute);

 app.listen(PORT,()=>console.log(`Server started at PORT:${PORT}`));