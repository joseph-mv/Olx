import React, { useContext, useEffect, useState } from "react";
import {  collection, getDocs, where, query } from "firebase/firestore";
import Heart from "../../assets/Heart";
import "./Post.css";
import { db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../../store/PostContext";
import { AuthContext } from "../../store/FirebaseContext";
import { useTranslation } from "react-i18next";


function Posts() {
  const [myProducts, setMyProducts] = useState([]);
  const [products,setProducts]=useState([]);
  const { user } = useContext(AuthContext)
  const { t } = useTranslation();
  // console.log('user')
  // console.log(user?.uid)


useEffect(() => {
  const fetchMyProducts = async () => {
    try {
      const productsCollection = collection(db, "products");
      const q = query(productsCollection, where("userId", "==", user?.uid));
      const querySnapshot = await getDocs(q);
      const allProducts = querySnapshot.docs.map((product) => ({
        ...product.data(),
        id: product.id,
      }));
      setMyProducts(allProducts);
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };
 if(user){
  fetchMyProducts();
 
 }
  
}, [user]);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      console.log(user)
      const productsCollection = collection(db, "products");

      const q = user 
      ? query(productsCollection, where("userId", "!=", user.uid)) 
      : query(productsCollection); console.log(q)
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot)
      const allProducts = querySnapshot.docs.map((product) => ({
        ...product.data(),
        id: product.id,
      }));
      setProducts(allProducts);
      // console.log(allProducts)
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };

  fetchProducts();
 
 
  
}, [user]);



const {setPostDetails} = useContext(PostContext)
const navigate= useNavigate()

const productHandler=(e,product)=>{
e.preventDefault();
setPostDetails(product)
navigate('view')
}


 
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          
        </div>
        <div className="cards">
          {myProducts.map((product) => {
           return <div onClick={(e)=>{productHandler(e,product)}} className="card">
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={product.downloadURL} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name} </p>
              </div>
              <div className="date">
                <span>{product.createdAt.toDate().toDateString()}</span>
              </div>
            </div>;
          })}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>{t("FRESH_RECOMMENDATIONS")}</span>
        </div>
        <div className="cards">
         
        {products.map((product) => {
           return <div onClick={(e)=>{productHandler(e,product)}} className="card">
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={product.downloadURL} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name} </p>
              </div>
              <div className="date">
                <span>{product.createdAt.toDate().toDateString()}</span>
              </div>
            </div>;
          })}
        </div>
      </div>
    </div>
  );
}

export default Posts;

