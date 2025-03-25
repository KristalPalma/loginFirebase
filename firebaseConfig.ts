// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

  apiKey: "AIzaSyDPBOcbwzuaG6KUr089MJOivCGWuGf_RNc",

  authDomain: "auth-c73b0.firebaseapp.com",

  projectId: "auth-c73b0",

  storageBucket: "auth-c73b0.firebasestorage.app",

  messagingSenderId: "117139748097",

  appId: "1:117139748097:web:e7203b960f91055f0c1700",

  measurementId: "G-WW2RNPWY53"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app)

export { app, db };