// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBx4vLXD1bfeQpUaovLhUGOQzwPvO1tNlI",
  authDomain: "deals-smart.firebaseapp.com",
  projectId: "deals-smart",
  storageBucket: "deals-smart.firebasestorage.app",
  messagingSenderId: "992799478811",
  appId: "1:992799478811:web:e6dc098157d89cb02254be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);