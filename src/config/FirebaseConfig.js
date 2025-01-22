// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBB_UiK5VkSFMWAj5hReNaFou-cEUu5vTU",
  authDomain: "timeline-6abb4.firebaseapp.com",
  projectId: "timeline-6abb4",
  storageBucket: "timeline-6abb4.firebasestorage.app",
  messagingSenderId: "404220330707",
  appId: "1:404220330707:web:86f5641a37ff53e99b8a26",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
