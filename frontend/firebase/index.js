// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxoFa6TXm1cz9XB8ykhx7Ujh-8pDQcuKI",
  authDomain: "researchmanagement-58194.firebaseapp.com",
  projectId: "researchmanagement-58194",
  storageBucket: "researchmanagement-58194.appspot.com",
  messagingSenderId: "304835074472",
  appId: "1:304835074472:web:32c66e344ae003ed14a59d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);