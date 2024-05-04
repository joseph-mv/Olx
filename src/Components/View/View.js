import React, { useContext, useEffect, useState } from 'react';
import { getDocs,collection,where,query } from "firebase/firestore";


import './View.css';

import { PostContext } from '../../store/PostContext';
import { db } from '../../firebase/config';

function View() {
  
 const { postDetails } = useContext(PostContext);
const [userDetails, setUserDetails] = useState()

// Function to fetch user data with cleanup
async function fetchUserData(db, postDetails) {
  const usersCollectionRef = collection(db, "Users");
  const q = query(usersCollectionRef, where("id", "==", postDetails.userId));

  try {
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        setUserDetails(doc.data())
        console.log("User data:", doc.data());
      });
    } else {
      console.log("No user found with id:", postDetails.userId);
    }
  } catch (error) {
    console.error("Error getting documents:", error);
  }
}




useEffect(() => {
  fetchUserData(db, postDetails);

 
}, []); // Dependency array

  console.log(userDetails)

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.downloadURL}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt.toDate().toDateString()}</span>
        </div>
        {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.userName}</p>
          <p>{userDetails.phone}</p>
          <p>{userDetails.email}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
