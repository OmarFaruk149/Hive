import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCGSsG0m6DTU1CgVOUboHugDfgVqD4dmYk",
  authDomain: "socialmedia-dc07a.firebaseapp.com",
  projectId: "socialmedia-dc07a",
  storageBucket: "socialmedia-dc07a.appspot.com",
  messagingSenderId: "935182961276",
  appId: "1:935182961276:web:8e816d269152511e3dd7f9",
  measurementId: "G-7MRED99LXJ",
  databaseURL: "https://socialmedia-dc07a-default-rtdb.firebaseio.com",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app, "gs://socialmedia-dc07a.appspot.com");
