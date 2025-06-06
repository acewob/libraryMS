export const typeDefs=`
extend type Query{
    user:User
}
type User{
    id:Int
    name:String
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
    User:{
        name:(obj)=>{
            return obj.name.toUpperCase();
        }
    }
};