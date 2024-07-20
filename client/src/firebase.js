// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "railnew.firebaseapp.com",
  projectId: "railnew",
  storageBucket: "railnew.appspot.com",
  messagingSenderId: "520075844392",
  appId: "1:520075844392:web:1499458051eeae01ffce1d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);