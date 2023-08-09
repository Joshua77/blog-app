import "../login/login.css";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async(e)=>{
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post('/api/auth/register',{
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (error) {
      setError(true);
    }
  }
  return (
    <>
      <div className="login">
        <span className="loginTitle">Register</span>
        <form className="loginForm" action="" onSubmit={handleSubmit}>
          <label>Username</label>
          <input className="loginInput" type="text" placeholder="Your username" onChange={(e)=>setUsername(e.target.value)}/>
          <label>Email</label>
          <input className="loginInput" type="text" placeholder="Email Address..." onChange={(e)=>setEmail(e.target.value)}/>
          <label>Password</label>
          <input className="loginInput" type="password" placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)}/>
          <button className="submitLogin">Register</button>
          <button className="submitLoginRegister">Login</button>
        </form>
      </div>
      {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
    </>
  );
}
