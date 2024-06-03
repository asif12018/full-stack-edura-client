// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: import.meta.env.VITE_APIKEY,
  // authDomain: import.meta.env.VITE_AUTHDOMAIN,
  // projectId: import.meta.env.VITE_PROJECTID,
  // storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  // messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  // appId: import.meta.env.VITE_APPID


  apiKey: "AIzaSyDLFctBjo9oV11IZpP3E9GoG4RyscDOqqQ",
  authDomain: "edura-4b499.firebaseapp.com",
  projectId: "edura-4b499",
  storageBucket: "edura-4b499.appspot.com",
  messagingSenderId: "317288380429",
  appId: "1:317288380429:web:48d051acc38608ee607d44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;