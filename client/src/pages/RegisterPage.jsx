import { useState } from "react"

export default function RegisterPage(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    async function register(e){
        e.preventDefault();
        const response = await fetch("http://localhost:3000/register", {
            method: 'POST',
            body: JSON.stringify({username,password}),
            headers: {'Content-Type': 'application/json'},
        })
        console.log(response);
        if(response.status === 200 ){
            alert("Registration successful");
        }
        else{
            alert("Registration failed");
        }
    }
    return (
        <form className="register" onSubmit={register}>
            <h1>Register</h1>
            <input  type="text" 
                    placeholder="Username"
                    value={username}
                    onChange={ (e) => setUsername(e.target.value)}></input>
            <input  type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}></input>
            <button>Register</button>
        </form>
    )
}