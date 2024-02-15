// import firebase from './firebase';
import { initializeApp } from 'firebase/app';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB4E4OI9VT0JFBF1_k-40rja2kysBhLeK4",
  authDomain: "netflix-clone-cbb03.firebaseapp.com",
  databaseURL: "https://netflix-clone-cbb03-default-rtdb.firebaseio.com",
  projectId: "netflix-clone-cbb03",
  storageBucket: "netflix-clone-cbb03.appspot.com",
  messagingSenderId: "430506717005",
  appId: "1:430506717005:web:a465f9731cd2ee64909104"
 
};

const firebaseApp= initializeApp(firebaseConfig);
// const db =firebaseApp.firestore();
const db=getFirestore(firebaseApp);
const auth=getAuth(firebaseApp);

export {auth}
export default db;