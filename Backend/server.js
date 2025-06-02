require('dotenv').config();
const express=require("express");
const mongoose=require("mongoose");
const routes=require("./routes/auth.js");

//connect to database 
mongoose.connect(
    process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then(()=>{
        console.log("Connected to MongoDB!")
    }).catch((err)=>{
        console.error("Error connecting to MongoDB",err)
    });

const cors=require("cors");

const app=express();

app.use(cors());
app.use(express.json());
app.use("/api",routes);

app.get("/",(req,res)=>{
    res.send("Server is running...");
});

const PORT=process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log(`Server listenning on port ${PORT}`);
});