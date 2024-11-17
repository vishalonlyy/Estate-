/* eslint-disable @typescript-eslint/no-unused-vars */
import { initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

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

// Initialize Analytics only in browser environment
let analytics: Analytics | undefined;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}
export { analytics };