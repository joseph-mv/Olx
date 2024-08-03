import React, { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
// import {storage} from '../../firebase/config'
import { db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { AuthContext } from "../../store/FirebaseContext";
import { useNavigate } from "react-router-dom";

const storage = getStorage();
const Create = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      const storageRef = ref(storage, "images/" + image.name);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            // You can store the downloadURL in your database or use it as needed
            const productsCollection = collection(db, "products");
            console.log(name);
            // Create a new document in the "products" collection with the downloadURL and name
            addDoc(productsCollection, {
              name,
              category,
              price,
              downloadURL,

              userId: user.uid,
              createdAt: new Date(),
            })
              .then(() => {
                console.log("Document successfully written!");
                navigate("/");
              })
              .catch((error) => {
                console.error("Error writing document: ", error);
                console.log(error);
              });
          });
        }
      );
    } else {
      console.log("No image selected");
    }

    // try {
    //   console.log(image)
    //   const spaceRef = ref(storage, `images/${image.name}`);
    //   const snapshot = await uploadBytes(spaceRef, image);
    //   console.log('File uploaded successfully!');
    // } catch (error) {
    //   console.error('Error uploading file:', error);
    // }
  };
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              defaultValue=""
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              defaultValue=""
              onChange={(e) => setCategory(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input
              className="input"
              type="number"
              id="fname"
              name="Price"
              onChange={(e) => setPrice(e.target.value)}
            />
            <br />
          </form>
          <br />
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={image ? URL.createObjectURL(image) : ""}
          ></img>
          <form>
            <br />
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">
              upload and Submit
            </button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
