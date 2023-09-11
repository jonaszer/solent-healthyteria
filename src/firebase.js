import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyACgkLaePbqH0xdQBhG11Zi0JioxvF1Mr8",
  authDomain: "solent-healthyteria-e408a.firebaseapp.com",
  projectId: "solent-healthyteria-e408a",
  storageBucket: "solent-healthyteria-e408a.appspot.com",
  messagingSenderId: "664416543038",
  appId: "1:664416543038:web:78ebb866d49f7a49478c6f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
