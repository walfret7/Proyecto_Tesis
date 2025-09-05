// src/firebase.js (o donde tengas tu config)
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ⬅️ agrega esto

const firebaseConfig = {
  apiKey: "AIzaSyAMBn5d5RdNwyE9O-aQORmRBxNm96n5lFk",
  authDomain: "bd-gmmcia.firebaseapp.com",
  projectId: "bd-gmmcia",
  storageBucket: "bd-gmmcia.firebasestorage.app",
  messagingSenderId: "599046077736",
  appId: "1:599046077736:web:b473bbf437c218b3fb641d"
};

const app = initializeApp(firebaseConfig);

// ⬇️ EXPÓRTALO para usar Firestore en el resto de tu app
export const db = getFirestore(app);
