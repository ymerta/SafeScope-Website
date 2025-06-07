
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: "API-KEY",
  authDomain: "ppedetection-ac0e8.firebaseapp.com",
  projectId: "ppedetection-ac0e8",
  storageBucket: "ppedetection-ac0e8.firebasestorage.app",
  messagingSenderId: "199223000666",
  appId: "1:199223000666:web:678e941db5e201ba4b2263",
  measurementId: "G-X7R5S92YGG",
  databaseURL: "https://ppe-detection-77a84-default-rtdb.firebaseio.com/" // 🔥 BU SATIR ÖNEMLİ
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, set, onValue, remove };
