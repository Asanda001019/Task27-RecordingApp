// firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDdfUZRvVgvXJKvNxaGDtpbbASfV4vPmE",
  authDomain: "recording-app-5e5e3.firebaseapp.com",
  projectId: "recording-app-5e5e3",
  storageBucket: "recording-app-5e5e3.firebasestorage.app",
  messagingSenderId: "1062954280362",
  appId: "1:1062954280362:web:90f25f5d69ab3177a237d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// Export auth to use in other parts of the app
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };
