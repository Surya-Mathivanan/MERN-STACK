import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Replace the following with your Firebase project config:
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);



// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// const firebaseConfig = {
//   apiKey: "AIzaSyCP8kvMcMiu2GYA8EtuOTg0vYyFqKy1Bag",
//   authDomain: "authendicationform.firebaseapp.com",
//   projectId: "authendicationform",
//   storageBucket: "authendicationform.firebasestorage.app",
//   messagingSenderId: "689964611295",
//   appId: "1:689964611295:web:d36a0d526d086712e75b6a"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
