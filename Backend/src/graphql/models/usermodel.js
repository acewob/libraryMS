import { ObjectId } from "mongodb";

export const typeDefs=`
type Query{
    users:[User!]!
    user(id:ID!):User
}
type Mutation{
    createUser(user:NewUserInput!):User
    updateUser(id:ID!,update:UpdateUserInput):User
}


input NewUserInput{
    name:String!
    email:String!
}
input UpdateUserInput{
    name:String!
}

type User{
    id:ID!
    name:String
    email:String
}
`

export const resolvers={
    Query:{
        users:(_,args,{mongo})=>{
            return mongo.users.find().toArray();
        },
        user:async (obj,{id},{mongo})=>{
            return mongo.users.findOne({_id: new ObjectId(id)});
        },
    },
    Mutation:{
        createUser:async(_,{user},{mongo})=>{
            const response=await mongo.users.insertOne(user);
            return{
                id:response.insertedId,
                ...user,
            }
        },
        updateUser: async (obj,{id,update},{mongo})=>{
            console.log(update)
            await mongo.users.updateOne(
                {_id:new ObjectId(id)},
                {$set:{
                    name:update.name
                }}
            );
            return await mongo.users.findOne({_id: new ObjectId(id)});
        }
    },
    User:{
        id:({_id,id})=>_id||id,
        name:(obj)=>{
            return obj.name.trim().toUpperCase();
        }
    }
};