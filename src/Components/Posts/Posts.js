import React, { useContext, useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Heart from "../../assets/Heart";
import "./Post.css";
import { db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../../store/PostContext";


function Posts() {
  const [products, setProducts] = useState([]);
 
useEffect(() => {
  
  
  const productsCollection = collection(db, "products");
  getDocs(productsCollection)
  .then((querySnapshot) => {
    const allPost = querySnapshot.docs.map((product) => {
      // Print the data of each document
      // console.log(product.data());
      return { ...product.data(), id: product.id };
    });
// console.log(allPost)
    setProducts(allPost);
    // console.log(products);
  })
  .catch((error) => {
    console.log("Error getting documents: ", error);
  });
}, [])
// console.log(products)e
const {setPostDetails} = useContext(PostContext)
const navigate= useNavigate()

const productHandler=(e,product)=>{
e.preventDefault();
setPostDetails(product)
navigate('view')
}
console.log(products)

 
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
         
          <span>View more</span>
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
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;

