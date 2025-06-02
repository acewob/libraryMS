const express=require("express");
const router=express.Router();
const User=require("../models/User");


router.post("/users", async (req,res)=>{
    try{
        const newUser=await User.create(req.body);
        console.log(req.body);
        res.status(201).json(newUser);
    }catch(error){
        res.status(400).json({error:error.message});
    }
});

module.exports=router;