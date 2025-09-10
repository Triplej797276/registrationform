import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your MHC ERP Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApw_WneyDTByuPSj0OuFAtIuY6vqci9LM",
  authDomain: "mhkcerp-1a913.firebaseapp.com",
  projectId: "mhkcerp-1a913",
  storageBucket: "mhkcerp-1a913.firebasestorage.app",
  messagingSenderId: "444610489913",
  appId: "1:444610489913:web:6f3d406580a776a93be7e8",
  measurementId: "G-N5W4SJVZKG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and export it as 'db'
export const db = getFirestore(app);

// Initialize Analytics (optional, kept from your original code)
const analytics = getAnalytics(app);

// Export the app (kept for compatibility)
export default app;