// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOFAhU18ITnljOJ3L9n9-TlcJ5XtTotNY",
  authDomain: "agenda-virtual-fearc.firebaseapp.com",
  databaseURL: "https://agenda-virtual-fearc-default-rtdb.firebaseio.com",
  projectId: "agenda-virtual-fearc",
  storageBucket: "agenda-virtual-fearc.appspot.com",
  messagingSenderId: "153894393930",
  appId: "1:153894393930:web:03250e959f337036bc2eb3",
  measurementId: "G-GBQXYWJML6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore();