import "./App.css";
import Home from "./Pages/Home";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Create from "./Pages/Create";
import ViewPost from "./Pages/ViewPost";

import { useContext, useEffect } from "react";
import { AuthContext } from "./store/FirebaseContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Post } from './store/PostContext';
import {Search} from './store/SearchProductListContext'

function App() {
  const { setUser } = useContext(AuthContext);
//  console.log('app')
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        
        setUser(user);
      } else {
        // User is signed out
      }
    });
  }, []);

  return (
    <div>
      
      <Post>
        <Search >
        <Router>
          <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sell" element={<Create />} />
            <Route path="/view" element={<ViewPost />} />
          </Routes>
        </Router>
        </Search>
      </Post>
    </div>
  );
}

export default App;
