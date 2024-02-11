// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMn9RXaJc3lWzvYBSzDF3L_Hb-oC7yv_Q",
  authDomain: "smra-499de.firebaseapp.com",
  projectId: "smra-499de",
  storageBucket: "smra-499de.appspot.com",
  messagingSenderId: "324786353304",
  appId: "1:324786353304:web:c07098ab2ce96c03c0cced"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();