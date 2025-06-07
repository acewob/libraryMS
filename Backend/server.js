import express from'express'
import {ruruHTML} from'ruru/server'
import { createYoga } from 'graphql-yoga';
import { schema } from './src/graphql/index.js';
import { setUpDatabase } from './src/mongo/index.js';

const yoga=createYoga({
    schema,
    context:async()=>{
        const mongo=await setUpDatabase();
        return{
            mongo,
        };
    }
});
const app=express()

app.all("/graphql",yoga);

app.get('/',(_req,res)=>{
    res.type('html');
    res.end(ruruHTML({endpoint:'/graphql'}));
})


app.listen(4000,()=>{
    console.log(
        `server running at port 4000`
    )
})