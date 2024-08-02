import React, { useContext, useEffect, useState } from "react";
import { doc, collection, getDocs, where, query, updateDoc } from "firebase/firestore";
import Heart from "../../assets/Heart";
import "./Post.css";
import { db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../../store/PostContext";
import { AuthContext } from "../../store/FirebaseContext";
import { useTranslation } from "react-i18next";

function Posts() {
  const [myProducts, setMyProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);
  const { t } = useTranslation();
  const { setPostDetails } = useContext(PostContext);
  const [likedPosts, setLikedPosts] = useState({});
  const navigate = useNavigate();

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
    if (user) {
      fetchMyProducts();
    }
  }, [user]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, "products");
        const q = user
          ? query(productsCollection, where("userId", "!=", user.uid))
          : query(productsCollection);
        const querySnapshot = await getDocs(q);
        const allProducts = querySnapshot.docs.map((product) => ({
          ...product.data(),
          id: product.id,
        }));
        setProducts(allProducts);
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    };

    fetchProducts();
  }, [user]);

  const productHandler = (e, product) => {
    e.preventDefault();
    setPostDetails(product);
    navigate("view");
  };
  const modifyFavourite = async (id) => {
    
    try {
      console.log("Modifying")
      const usersCollection = collection(db, "Users");

      const q = query(usersCollection, where("id", "==", user.uid));

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (docs) => {
        const userDocRef = doc(db, "Users", docs.id);

        const userData = docs.data();

        const updatedFavourite = userData.favourite
         console.log(updatedFavourite)
        if (updatedFavourite[id]) {
          delete updatedFavourite[id];
        } else {
          updatedFavourite[id] = true;
        }
        console.log(updatedFavourite)
        setLikedPosts(updatedFavourite)
        // console.log(userData)
        await updateDoc(userDocRef, { favourite: updatedFavourite })
        console.log(likedPosts)
        // console.log(updatedFavourite)
      });

    } catch (erorr) {
      console.log(erorr);
    }
  }
  const handleFavourite = (e, id) => {
    e.stopPropagation();
   
    modifyFavourite(id)

  };
  useEffect(() => {
    
    modifyFavourite(false)
  }, [user])


  return (
    <div className="postContainer">
      <div className="postParentDiv">
        <div className="moreView">
          <div className="heading"></div>
          <div className="cards">
            {myProducts.map((product) => (
              <div
                key={product.id}
                onClick={(e) => productHandler(e, product)}
                className="card"
              >
                <div
                  onClick={(e) => handleFavourite(e, product.id)}
                  className="favourite"
                >
                  <Heart like={likedPosts[product.id]} />
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
              </div>
            ))}
          </div>
        </div>
        <div className="recommendations">
          <div className="heading">
            <span>{t("FRESH_RECOMMENDATIONS")}</span>
          </div>
          <div className="cards">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={(e) => productHandler(e, product)}
                className="card"
              >
                <div
                  onClick={(e) => handleFavourite(e, product.id)}
                  className="favourite"
                >
                  <Heart like={likedPosts[product.id]} />
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
