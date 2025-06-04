const express=require('express')
const { default: mongoose } = require('mongoose')
const {ruruHTML}=require('ruru/server')


const mpngoose=require('mongoose')
const {createHandler}=require("graphql-http/lib/use/http")
const app=express()
const {buildSchema}=require('graphql')

mongoose.connect("mongodb://localhost:27017/libraryMS",{
    useNewUrlParser:true,
    //useCreateIndex:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("mongo Db connected")
}).catch((err)=>{
    console.log("Error:",err)
})

const schema=buildSchema(`
    type Query{
        name:String,
        age:Int,
    }
`)
const rootValue={
    name:()=>{
        return "jonh wick"
    },
    age:()=>{
        return 25
    }
}

app.all('/graphql',createHandler({
    schema:schema,
    rootValue:rootValue,
}))

app.get('/',(_req,res)=>{
    res.type('html');
    res.end(ruruHTML({endpoint:'/graphql'}));
})

app.get("/",(req,res)=>{
    res.send("Hello from backend");
})

app.listen(4000,()=>{
    console.log(
        `server running at port 4000
    
        TEST:http://localhost:4000/graphql?query={name,age}`

    )
})