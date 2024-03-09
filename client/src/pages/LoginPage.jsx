import { useContext, useState } from "react"
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage(){
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [redirect,setRedirect] = useState(false);
    const {setUserInfo} = useContext(UserContext);

    async function login(e){
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:3000/login",{
                method: "POST",
                body: JSON.stringify({username,password}),
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
            })
            console.log(response);

            if(response.ok){
                response.json().then((userInfo) => {
                    setUserInfo(userInfo);
                    setRedirect(true);
                })
                
            }
            else{
                alert("Wrong Credentials");
            }
        }
        catch(err){

        }
    }
    if(redirect){
        alert("login successfull");
        return <Navigate to={'/'} />
    }

    return (
        <form className="login" onSubmit={login}>
            <h1>Login</h1>
            <input type="text" 
                   placeholder="Username"
                   value={username}
                   onChange={(e)=>setUsername(e.target.value)}></input>
            <input type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}></input>
            <button>Login</button>
        </form>
    )
}