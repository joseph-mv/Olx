import React, { useContext, useState } from 'react';

import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/FirebaseContext';
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
  console.log(email)

  const firebase= useContext(FirebaseContext)
  
  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(e)
    
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    const user = userCredential.user;
   
    return updateProfile(user, {
      displayName: userName
    }).then(()=>{
      console.log(user)
      addDoc(collection(db, "Users"), {
        id:user.uid,
        userName:userName,
        email:email,
        phone:phone,
      }).then(() => {
        navigate("/login");
     });
    })
  
  })

  }  
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
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
          />
          <br />
          <br />
          <button type='submit' >Signup</button>
        </form>
        <a onClick={()=>{navigate("/login")}}>Login</a>
      </div>
    </div>
  );
}
