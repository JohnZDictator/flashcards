// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_3Putho4lbXqIZRJrSoI34qHo05F9hHY",
  authDomain: "flashcardsaas-237fd.firebaseapp.com",
  projectId: "flashcardsaas-237fd",
  storageBucket: "flashcardsaas-237fd.appspot.com",
  messagingSenderId: "137481775258",
  appId: "1:137481775258:web:479999897e86001ca1d723",
  measurementId: "G-CF78YZQ8P8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app)

export {db}