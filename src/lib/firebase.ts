import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAIK7KLeHbR1nbeUCdYA9tUjDuPAVBjb2Y",
  authDomain: "drivana-349f9.firebaseapp.com",
  projectId: "drivana-349f9",
  storageBucket: "drivana-349f9.firebasestorage.app",
  messagingSenderId: "841653943343",
  appId: "1:841653943343:web:a2824e7a9cc93e5e1d9ada",
  measurementId: "G-SJ8BE24QHS",
};

// Initialize Firebase (prevent re-initialization in dev with HMR)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Auth - works fine with SSR
const auth = getAuth(app);

export { app, auth, firebaseConfig };
