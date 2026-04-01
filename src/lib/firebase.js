import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_4LikVG5yUw0UnpGn1gCYId2pyhQhCuM",
  authDomain: "bolt-88e5b.firebaseapp.com",
  projectId: "bolt-88e5b",
  storageBucket: "bolt-88e5b.firebasestorage.app",
  messagingSenderId: "540453435828",
  appId: "1:540453435828:web:afff0224da1df5d72a1ae1",
  measurementId: "G-JXXQMDX6XW"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
