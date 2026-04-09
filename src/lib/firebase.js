import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Validate that all required Firebase config variables are present
const requiredConfigKeys = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId', 'measurementId'];
const missingKeys = requiredConfigKeys.filter(key => !firebaseConfig[key]);

if (missingKeys.length > 0) {
  const errorMsg = `Missing required Firebase environment variables: ${missingKeys.join(', ')}. Please configure them in your environment.`;
  console.error(errorMsg);
  // Display error to user
  document.documentElement.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#f3f4f6;font-family:system-ui"><div style="background:white;padding:40px;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,0.1);max-width:500px"><h1 style="color:#dc2626;margin:0 0 16px">Configuration Error</h1><p style="color:#6b7280;margin:0;line-height:1.6">${errorMsg}</p></div></div>`;
  throw new Error(errorMsg);
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
