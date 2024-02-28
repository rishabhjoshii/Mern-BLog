import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header(){
    const [username, setUsername] = useState(null);
    useEffect(() => {
        fetch('http://localhost:3000/profile',{
            credentials: 'include',
        }).then((response) => {
            response.json().then((userInfo) => {
                setUsername(userInfo.username);
            })
        })
    },[])

    function logout(){
        fetch('http://localhost:3000/logout',{
            credentials: 'include',
            method: 'POST',
        })

        setUsername(null);
    }
    return (
        <header>
        <Link to="/"  className="logo">MyBLog</Link>
        <nav>
            {username && (
                <>
                    <Link to="/create">Create new post</Link>
                    <a onClick={logout}>Logout</a>
                </>
            )}
            {!username && (
                <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                </>
            )}
        </nav>
      </header>
    )
}