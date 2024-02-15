import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4E4OI9VT0JFBF1_k-40rja2kysBhLeK4",
  authDomain: "netflix-clone-cbb03.firebaseapp.com",
  databaseURL: "https://netflix-clone-cbb03-default-rtdb.firebaseio.com",
  projectId: "netflix-clone-cbb03",
  storageBucket: "netflix-clone-cbb03.appspot.com",
  messagingSenderId: "430506717005",
  appId: "1:430506717005:web:a465f9731cd2ee64909104",
  measurementId: "G-2CF0RRLNLF"
};

const firebaseApp= firebase.initializeApp(firebaseConfig);
const db =firebaseApp.firestore();
const auth=firebase.auth();

export {auth}
export default db;