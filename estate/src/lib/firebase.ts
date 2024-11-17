/* eslint-disable @typescript-eslint/no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlS49Sc3FeTndunjx7xNnwrBoBBc0lxYk",
  authDomain: "teamshauryawebsite.firebaseapp.com",
  projectId: "teamshauryawebsite",
  storageBucket: "teamshauryawebsite.firebasestorage.app",
  messagingSenderId: "76760791772",
  appId: "1:76760791772:web:facca7356f8cf94ab09219",
  measurementId: "G-BXYM5W3EYW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);