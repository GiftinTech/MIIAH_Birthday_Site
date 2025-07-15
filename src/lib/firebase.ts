import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDemo_apiKey_for_miiah_birthday",
  authDomain: "miiah-birthday-demo.firebaseapp.com",
  projectId: "miiah-birthday-demo",
  storageBucket: "miiah-birthday-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:demo_app_id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);