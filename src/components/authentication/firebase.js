// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyB8L1j4L7m81-9G223ucmosB3j2FniYVCI",
  authDomain: "laraib-myntra-clone.firebaseapp.com",
  projectId: "laraib-myntra-clone",
  storageBucket: "laraib-myntra-clone.appspot.com",
  messagingSenderId: "1041669062422",
  appId: "1:1041669062422:web:7a2af69e88dbcbc7f01a37",
  measurementId: "G-KD8G46KM42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export {app,auth};
