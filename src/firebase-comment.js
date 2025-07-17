import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { collection, addDoc } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9ukvbq-1cuuE2PxZwjCnf29mhnGvgFkA",
  authDomain: "portfolio-c7175.firebaseapp.com",
  projectId: "portfolio-c7175",
  storageBucket: "portfolio-c7175.firebasestorage.app",
  messagingSenderId: "1056476133797",
  appId: "1:1056476133797:web:b4aa082501a34398acd04c",
  measurementId: "G-K7P9BWYD88",
};


const app = initializeApp(firebaseConfig, "comments-app");
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, collection, addDoc };
