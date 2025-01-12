// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWToADhzXGEnfeAI-NaOfHdBJRp3vFgWU",
  authDomain: "aduan-banjir-masyarakat.firebaseapp.com",
  projectId: "aduan-banjir-masyarakat",
  storageBucket: "aduan-banjir-masyarakat.firebasestorage.app",
  messagingSenderId: "925787463924",
  appId: "1:925787463924:web:41e228690546ee6a9c7ea1",
  measurementId: "G-M7XKDBMTT9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;
