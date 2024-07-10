import "./App.css";
import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Create from "./Pages/Create";
import ViewPost from "./Pages/ViewPost"

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./store/FirebaseContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import{Post} from './store/PostContext'

function App() {
  const { setUser } = useContext(AuthContext);
  
 
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
        setUser(user);
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);
 
  return (
    
    <div>
      <Post >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/sell" element={<Create />}></Route>
          <Route path="/view" element={<ViewPost/>}></Route>
        </Routes>
      </BrowserRouter>
      </Post>
    </div>
    
  );
}

export default App;
