// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUprLWyXzp2h-L-myXzYQW6V3uk2axAyk",
  authDomain: "frontend-learn.firebaseapp.com",
  projectId: "frontend-learn",
  storageBucket: "frontend-learn.appspot.com",
  messagingSenderId: "939689996149",
  appId: "1:939689996149:web:e623033bc977739ae16d3c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
