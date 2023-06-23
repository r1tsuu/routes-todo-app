import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDxREaUOGx91DYz4clGvFDqXuP0PiFfp6o",
  authDomain: "smiling-gasket-302521.firebaseapp.com",
  projectId: "smiling-gasket-302521",
  storageBucket: "smiling-gasket-302521.appspot.com",
  messagingSenderId: "29427179742",
  appId: "1:29427179742:web:f0b7fe1199a93f4d44a24f",
  measurementId: "G-ZCJECR0V11",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
