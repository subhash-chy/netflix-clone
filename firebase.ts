// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3VnvrRna8RURR_GCQXrmNAHhGlzJGmQo",
  authDomain: "netflix-clone-4671e.firebaseapp.com",
  projectId: "netflix-clone-4671e",
  storageBucket: "netflix-clone-4671e.appspot.com",
  messagingSenderId: "626950089002",
  appId: "1:626950089002:web:dcf9da3d1d8643514b1653",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { db, auth };
