const user=require('../models/User')

const resolver={
    user:()=>{
        return "Hello from user"
    }
}
module.exports=resolver