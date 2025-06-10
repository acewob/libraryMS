import { useState } from 'react'
import axios from "axios";

export default function Register(){
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [age,setAge]=useState("");
    const [user, setUsers] = useState([]);

    const handleCreate=async(e)=>{
        e.preventDefault();
        try{
            const newUser={name,email}
            await axios.post("http://localhost:4000/register",{
                newUser
            });
            const response=await axios.get("http://localhost:4000/api/users");
            setUsers(response.data);
            setName("");
            setEmail("");
            setAge("");
        }catch(error){
            console.log("Error creating user",error);
         }
    };

    return (
        <form onSubmit={handleCreate}>
            <input placeholder='Name' type="text" value={name} onChange={(e)=>setName(e.target.value)} /><br></br>
            <input placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} /><br></br>
            <input placeholder='Age' value={age} onChange={(e)=>setAge(e.target.value)} /><br></br>
            <button type='submit'>Create User</button>
        </form>
)
}
