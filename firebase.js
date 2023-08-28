// import { initializeApp } from "firebase/app";
// import {getAuth} from 'firebase/auth'

// const firebaseConfig = {
//   apiKey: "AIzaSyBxFnz2G7TF9tA_mmUqwiWqSA1Xk64qHIM",
//   authDomain: "fir-auth-1132-410cd.firebaseapp.com",
//   projectId: "fir-auth-1132-410cd",
//   storageBucket: "fir-auth-1132-410cd.appspot.com",
//   messagingSenderId: "825584356284",
//   appId: "1:825584356284:web:7cef60d409089087bcb9b9",
//   measurementId: "G-7949JB6KRT"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const auth = getAuth();
// export {app,auth};










import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore'; // Import firestore function

const firebaseConfig = {
  apiKey: "AIzaSyBxFnz2G7TF9tA_mmUqwiWqSA1Xk64qHIM",
  authDomain: "fir-auth-1132-410cd.firebaseapp.com",
  projectId: "fir-auth-1132-410cd",
  storageBucket: "fir-auth-1132-410cd.appspot.com",
  messagingSenderId: "825584356284",
  appId: "1:825584356284:web:7cef60d409089087bcb9b9",
  measurementId: "G-7949JB6KRT"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get authentication object
const auth = getAuth();

// Get firestore object
// const firestore = getFirestore();

// Export the initialized app, auth, and firestore objects
export { app, auth };
  