import { buildSchema } from 'graphql';

const userSchema=buildSchema(`
    type Query{
        user:String
    }
    type user{
        name:String,
        age:String
    }
}
`);
module.exports =userSchema