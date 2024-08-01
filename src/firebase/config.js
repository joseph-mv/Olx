// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhTqsHcScwqGhkUkOOXbMXDHk3gMkNh_I",
  authDomain: "fir-60a08.firebaseapp.com",
  databaseURL: "https://fir-60a08-default-rtdb.firebaseio.com",
  projectId: "fir-60a08",
  storageBucket: "fir-60a08.appspot.com",
  messagingSenderId: "224994282898",
  appId: "1:224994282898:web:110a8e353120593b39c54b",
  measurementId: "G-8NG5YW5BJY"
};

// Initialize Firebase
export const firebase= initializeApp(firebaseConfig);

export const db = getFirestore(firebase);
export const storage = getStorage(firebase);
