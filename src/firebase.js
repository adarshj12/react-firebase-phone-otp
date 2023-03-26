import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: <API_KEY>,
  authDomain: <AUTH_DOMAIN>,
  projectId: <PROJECT_ID>,
  storageBucket: <STORAGE_BUCKET>,
  messagingSenderId: <MESSAGING_SENDER_ID>,
  appId: <APP_ID>,
  measurementId:<MEASUREMENT_ID>
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication =getAuth(app);