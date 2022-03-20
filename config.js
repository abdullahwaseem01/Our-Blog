import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyCR0DrTGTKxNv0vb0pz_Tr1BfW_fd_3jFo",
    authDomain: "blog-website-2f16f.firebaseapp.com",
    projectId: "blog-website-2f16f",
    storageBucket: "blog-website-2f16f.appspot.com",
    messagingSenderId: "713132346150",
    appId: "1:713132346150:web:02603c105dff4d63924fe7",
    measurementId: "G-QNRD3WWL6P"
  };
initializeApp(firebaseConfig);
const db = getFirestore();
const blogs = collection(db, 'blogs');

const submission = {
    "title": "hello",
    "description": "world",
    "name": "Abdullah Waseem",
    "posting": "Just a Test"
};
blogs.add();



