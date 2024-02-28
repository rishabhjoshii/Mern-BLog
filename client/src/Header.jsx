import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header(){
    useEffect(() => {
        fetch('http://localhost:3000/profile',{
            credentials: 'include',
        });
    },[])
    return (
        <header>
        <Link to="/"  className="logo">MyBLog</Link>
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      </header>
    )
}