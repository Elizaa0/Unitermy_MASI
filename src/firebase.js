import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, onSnapshot } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBG_ryaMnbk4paqCqhiX1xmZqEjUZJ8gsY",
  authDomain: "unitermapp.firebaseapp.com",
  projectId: "unitermapp",
  storageBucket: "unitermapp.firebasestorage.app",
  messagingSenderId: "788573569626",
  appId: "1:788573569626:web:588abcc90365cbedbf8e63",
  measurementId: "G-F6ECNWGYVL"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, onSnapshot };