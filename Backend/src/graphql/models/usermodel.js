export const typeDefs=`
type Query{
    user:User
}
type Mutation{
    createUser(user:NewUserInput!):User
}


input NewUserInput{
    name:String!
    age:Int!
}


type User{
    id:Int
    name:String
    age:Int
}
`

export const resolvers={
    Query:{
        user:()=>{
            return{
                id:1,
                name:"buddy"
            }
        }
    },
    Mutation:{
        createUser:async(_,{user},{mongo})=>{
            const users=await mongo.users.find().toArray();
            console.log(users);
            return{
                id:2,
                ...user,
            }
        }
    },
    User:{
        name:(obj)=>{
            return obj.name.trim().toUpperCase();
        }
    }
};