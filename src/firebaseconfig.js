// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUzatH4NWE2ts4sZbBXa4Y2MkDwKNZkNY",
  authDomain: "onlyfriends-d3e12.firebaseapp.com",
  databaseURL:
    "https://onlyfriends-d3e12-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "onlyfriends-d3e12",
  storageBucket: "onlyfriends-d3e12.firebasestorage.app",
  messagingSenderId: "265428459150",
  appId: "1:265428459150:web:0f2b196b94c316b71d73df",
  measurementId: "G-5XCDN1PSJH",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


