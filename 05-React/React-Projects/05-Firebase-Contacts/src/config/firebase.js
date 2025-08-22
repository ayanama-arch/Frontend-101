// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";

import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPnMZCPjG772MOOijzkagkTdAzN9DfWgs",
  authDomain: "project-05-398e4.firebaseapp.com",
  projectId: "project-05-398e4",
  storageBucket: "project-05-398e4.appspot.com",
  messagingSenderId: "440905994475",
  appId: "1:440905994475:web:ca6ddc762e31b34bd8eeae",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
