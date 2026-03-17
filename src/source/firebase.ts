// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhfevUtg4ajOcC01bfPVyCCziDRqos_GA",
  authDomain: "kochegar-7bf1e.firebaseapp.com",
  databaseURL: "https://kochegar-7bf1e-default-rtdb.firebaseio.com",
  projectId: "kochegar-7bf1e",
  storageBucket: "kochegar-7bf1e.firebasestorage.app",
  messagingSenderId: "456549648437",
  appId: "1:456549648437:web:0ed822191dd1af6c3d097c",
  measurementId: "G-SBWRGHNJW9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
