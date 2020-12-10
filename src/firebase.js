// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAfwRa0SzQ1HcE8F1mIiLs59QYmqxpL_XI",
  authDomain: "todo-app-jp.firebaseapp.com",
  databaseURL: "https://todo-app-jp.firebaseio.com",
  projectId: "todo-app-jp",
  storageBucket: "todo-app-jp.appspot.com",
  messagingSenderId: "1050895475972",
  appId: "1:1050895475972:web:e90314528fecf100c39c51",
  measurementId: "G-C107B9EHDJ",
});

const db = firebaseApp.firestore();
export default db;