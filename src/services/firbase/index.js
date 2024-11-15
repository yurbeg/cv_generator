import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCjguBxWtfqp0oytyrZP9yNh9L9NznfMmQ",
  authDomain: "cv-generator-952ab.firebaseapp.com",
  projectId: "cv-generator-952ab",
  storageBucket: "cv-generator-952ab.firebasestorage.app",
  messagingSenderId: "878798815291",
  appId: "1:878798815291:web:0436e88a31b64f0f811c1e",
  measurementId: "G-CDR1XKJZ34"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export {
  db,
  auth,
  storage
}
