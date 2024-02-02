// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASYM_JJ-AHpigGfwOpI2dVD56h37cTZlA",
  authDomain: "clone-967ed.firebaseapp.com",
  projectId: "clone-967ed",
  storageBucket: "clone-967ed.appspot.com",
  messagingSenderId: "1038776432044",
  appId: "1:1038776432044:web:5b4d0e5201d4d5af04f609",
  measurementId: "G-JFCH0ZTN8V"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default firebaseConfig