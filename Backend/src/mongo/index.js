import {Collection, MongoClient,ServerApiVersion} from 'mongodb';

const uri="mongodb://localhost:27017/lms";

const client=new MongoClient(uri,{
    serverApi:{
        version:ServerApiVersion.v1,
        strict:true,
        deprecationErrors:true
    }
});

export async function setUpDatabase(){
    try{
        await client.connect();
        const db=await client.db('lms');
        return{
            client,
            db,
            users: db.collection('users'),
            books:db.collection('books'),
        }
    }catch(err){
        console.log("Error connecting to database");
        return {};
    }
}