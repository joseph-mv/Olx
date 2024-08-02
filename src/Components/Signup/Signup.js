import React, { useState } from 'react';

import Logo from '../../olx-logo.png';
import './Signup.css';
// import { FirebaseContext } from '../../store/FirebaseContext';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from '../../firebase/config';
import { collection, addDoc } from "firebase/firestore"; 
import { useNavigate} from 'react-router-dom';
export default function Signup() {
  const[userName,setUserName]=useState()
  const[email,setEmail]=useState()
  const[password,setPassword]=useState()
  const[phone,setPhone]=useState()
  const navigate = useNavigate();
  const [error, setError]=useState("");

  const handleSubmit=(e)=>{
    e.preventDefault()
    // console.log(e)
    
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    const user = userCredential.user;
   
    return updateProfile(user, {
      displayName: userName
    }).then(()=>{
      // console.log(user)
      addDoc(collection(db, "Users"), {
        id:user.uid,
        userName:userName,
        email:email,
        phone:phone,
        favourite:{},
      }).then(() => {
        navigate("/login");
     });
    }).catch((error)=>{
      
      console.log(error)
    })
  
  }).catch((error)=>{
     setError("Invalid email or email already in use. Please enter a different email address.")
    
  })

  }  
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt='logo'></img>
        <form  onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            // defaultValue="John"
            value={userName}
            onChange={(e)=>{setUserName(e.target.value)}}
            required
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            // defaultValue="John"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            required
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="phone"
            name="phone"
            // defaultValue="Doe"
            value={phone}
            onChange={(e)=>{setPhone(e.target.value)}}
            required
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            // defaultValue="Doe"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            required
            minLength={6}
          />
          <br />
          <br />
          {error ? <p className='error'>{error}</p>:""}  {/* Display error message if exists */}
          <button type='submit' >Signup</button>
        </form>
        <span onClick={()=>{navigate("/login")}}>Login</span>
      </div>
    </div>
  );
}
