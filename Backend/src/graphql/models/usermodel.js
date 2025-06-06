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
        createUser:(_,{user})=>{
            console.log("Creating user");
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