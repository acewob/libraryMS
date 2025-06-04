const express=require('express')
const { default: mongoose } = require('mongoose')
const {ruruHTML}=require('ruru/server')


const mpngoose=require('mongoose')
const {createHandler}=require("graphql-http/lib/use/http")
const app=express()
const {buildSchema, GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt}=require('graphql')

mongoose.connect("mongodb://localhost:27017/libraryMS",{
    useNewUrlParser:true,
    //useCreateIndex:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("mongo Db connected")
}).catch((err)=>{
    console.log("Error:",err)
})
/*
const schema=buildSchema(`
    type Query{
        name(jina:String!):String,
        age:Int,
        isAdmin:Boolean,
        area:Float,
        hobbies:[String],
        user:User
    }
    type User{
        id:Int,
        name:String!
    }
`)
*/
/*
const rootValue={
    name:({jina})=>{
        return "habari yako "+jina;
    },
    age:()=>{
        return 25
    },
    isAdmin:false,
    area:30.56,
    hobbies:()=>{
        return ["F1","Blue","Jumping","Case study"]
    },
    user:()=>{
        return {
            id:1,
            name:"buddy"
        }
    }
}
*/

const User=new GraphQLObjectType({
    name:"User",
    fields:{
        id:{
            type:GraphQLInt
        },
        name:{
            type:GraphQLString
        }
    }
});

const schema=new GraphQLSchema({
    query:new GraphQLObjectType({
        name:"Query",
        fields:{
            hello:{
                type:GraphQLString,
                resolve:()=>{
                    return "hello world!";
                },
            },
             user:{
                type:User,
                resolve:()=>{
                    return{
                        id:1,
                        name:"buddy",
                    };
                },
            },
        },
    }),
});

app.all('/graphql',createHandler({
    schema
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