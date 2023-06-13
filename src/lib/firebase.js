import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAV91AcrC05gfwucxVE96-Ri3IEFUsCQd4",
  authDomain: "test-project-d148c.firebaseapp.com",
  databaseURL:
    "https://test-project-d148c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test-project-d148c",
  storageBucket: "test-project-d148c.appspot.com",
  messagingSenderId: "391036614578",
  appId: "1:391036614578:web:e7386355366411db9956ab",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const database = getDatabase(app);

export { db, auth, database };
