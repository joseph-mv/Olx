import React, { useContext, useEffect, useState } from "react";
import {
  doc,
  collection,
  getDocs,
  where,
  query,
  updateDoc,
} from "firebase/firestore";
import Heart from "../../assets/Heart";
import "./Post.css";
import { db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../../store/PostContext";
import { AuthContext } from "../../store/FirebaseContext";
import { useTranslation } from "react-i18next";
import { SearchProductListContext } from "../../store/SearchProductListContext";
function Posts() {
  const [myProducts, setMyProducts] = useState([]);
  const { user } = useContext(AuthContext);
  const { searchProductList } = useContext(SearchProductListContext);
  const { t } = useTranslation();
  const { setPostDetails } = useContext(PostContext);
  const [likedPosts, setLikedPosts] = useState({});
  const navigate = useNavigate();
  //  console.log('sea',searchProductList)
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

  const productHandler = (e, product) => {
    e.preventDefault();
    setPostDetails(product);
    navigate("view");
  };
  const modifyFavourite = async (id) => {
    
    if (id && !user) {
      // console.log("no user");
      navigate("/login");
    }

    try {
      // console.log("Modifying")
      const usersCollection = collection(db, "Users");

      const q = query(usersCollection, where("id", "==", user.uid));

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (docs) => {
        const userDocRef = doc(db, "Users", docs.id);

        const userData = docs.data();

        const updatedFavourite = userData.favourite;
        //  console.log(updatedFavourite)
        if (updatedFavourite[id]) {
          delete updatedFavourite[id];
        } else {
          updatedFavourite[id] = true;
        }
        // console.log(updatedFavourite)
        setLikedPosts(updatedFavourite);
        // console.log(userData)
        await updateDoc(userDocRef, { favourite: updatedFavourite });
        // console.log(likedPosts)
        // console.log(updatedFavourite)
      });
    } catch (erorr) {
      console.error(erorr);
    }
  };
  const handleFavourite = (e, id) => {
    // console.log(id)
    e.stopPropagation();

    modifyFavourite(id);
  };
  useEffect(() => {
    modifyFavourite();
  }, [user]);
  // console.log((likedPosts))
  // console.log((myProducts))
  // console.log(searchProductList)

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
            {searchProductList?.map((product) => (
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
