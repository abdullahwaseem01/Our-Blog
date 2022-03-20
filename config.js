const firebase = require('firebase');
const firebaseConfig = {
    apiKey: "AIzaSyCR0DrTGTKxNv0vb0pz_Tr1BfW_fd_3jFo",
    authDomain: "blog-website-2f16f.firebaseapp.com",
    projectId: "blog-website-2f16f",
    storageBucket: "blog-website-2f16f.appspot.com",
    messagingSenderId: "713132346150",
    appId: "1:713132346150:web:02603c105dff4d63924fe7",
    measurementId: "G-QNRD3WWL6P"
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const blogs = db.collection('blogs');
  module.exports = blogs; 