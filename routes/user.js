const {Router}=require("express");  //Router is a seperate object in express so we are extracting only Router class from express
const User=require('../models/user');


const router=Router();


router.get("/signin",(req,res)=>{
    return res.render("signin");
});

router.get("/signup",(req,res)=>{
    return res.render("signup");
});

router.post("/signin",async(req,res)=>{
    const{email,password}=req.body;
    console.log(email,password);
    try{
        const token= await  User.matchPasswordAndGenerateToken(email,password);
        console.log(token);
        return res.cookie("token",token).redirect("/");
        
    }catch(error){
        return res.render("signin",{
            error:"Incorrect Email or Password",
        });
    }

})

router.get('/logout',(req,res)=>{
    res.clearCookie("token").redirect("/");
})

router.post("/signup", async(req,res)=>{
    const {fullName, email,password }=req.body;
    await User.create({
        fullName,
        email,
        password,
    });
    return res.redirect("/");
})
module.exports=router;
