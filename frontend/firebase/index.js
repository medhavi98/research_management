// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import firebase from "firebase/app";
import "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3htYzKG2LxUrWOpzfP8LgxvoO3NuOU3g",
  authDomain: "researchm-a8f30.firebaseapp.com",
  projectId: "researchm-a8f30",
  storageBucket: "researchm-a8f30.appspot.com",
  messagingSenderId: "238058041637",
  appId: "1:238058041637:web:90fc11cf44052554996acc"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
export { storage, firebase as default };
