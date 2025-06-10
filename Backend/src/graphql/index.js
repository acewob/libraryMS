import { createSchema } from "graphql-yoga";
import _ from "lodash";

import { typeDefs as User,resolvers as userResolvers } from "./models/usermodel.js";
const queries=`
    type Query{
        hello:String
    }
`


const resolvers={
    Query:{
        hello:()=>"Hello from yoga",
    },
};



export const schema=createSchema({
    typeDefs:[queries,User],
    resolvers:_.merge(resolvers,userResolvers),
})