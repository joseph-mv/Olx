import React, { useState } from "react";

import Logo from "../../olx-logo.png";
import "./Login.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]=useState("");


  /*  */
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(e);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        
        navigate("/");
      })
      .catch((error) => {
       
        setError('invalid email or password');
      });
  };
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt="logo"></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            defaultValue="josephmv43@gmail.com"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            defaultValue="12345678"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <br />
          <p>{error&&error}</p>
          <button>Login</button>
        </form>
            
        <span onClick={()=>{navigate("/signup")}}>Signup</span>
      </div>
    </div>
  );
}

export default Login;
