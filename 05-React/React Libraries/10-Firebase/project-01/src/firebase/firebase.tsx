// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-IzqaOMCyCjtL1Usmcca0CrLnJGOEG1E",
  authDomain: "proxima-centauri-9ecca.firebaseapp.com",
  projectId: "proxima-centauri-9ecca",
  storageBucket: "proxima-centauri-9ecca.appspot.com",
  messagingSenderId: "325544722902",
  appId: "1:325544722902:web:6ca2386ba96c679d62e477",
  measurementId: "G-RFR2F06J2S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
