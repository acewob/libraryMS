import { gql, useQuery } from "@apollo/client";

const GET_USERS=gql`
    query Getusers{
        users{
            id
            name
            email
        }
    }
`;

export function DisplayUsers(){
    const {loading,error,data}=useQuery(GET_USERS);
    if(loading) return <p>Loading.....</p>;
    if(error) return <p>Error:{error.message}</p>;
    return data.users.map(({id,name,email})=>(
        <div key={id}>
            <h3>{name}</h3>
            <h6>{email}</h6>
        </div>
    ));
}