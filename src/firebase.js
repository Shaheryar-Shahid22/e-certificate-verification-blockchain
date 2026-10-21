import firebase from "firebase";
import "firebase/database";

var firebaseConfig = {
    apiKey: "AIzaSyDs-UzBW-4eZwrvxBIunygVqh1oMc3u1I4",
    authDomain: "e-certificate-ab3f1.firebaseapp.com",
    databaseURL: "https://e-certificate-ab3f1.firebaseio.com",
    projectId: "e-certificate-ab3f1",
    storageBucket: "e-certificate-ab3f1.appspot.com",
    messagingSenderId: "188962471383",
    appId: "1:188962471383:web:99888f949482fba619df92",
    measurementId: "G-LN8X3JL3BX"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebase.database();