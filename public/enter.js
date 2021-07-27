var firebaseConfig = {
    apiKey: "AIzaSyAVERWeWXR66KSEjwGBO63c_1t9QRWl7zY",
    authDomain: "madcamp4-3decd.firebaseapp.com",
    projectId: "madcamp4-3decd",
    storageBucket: "madcamp4-3decd.appspot.com",
    messagingSenderId: "691369293361",
    appId: "1:691369293361:web:ddd51bcb77e56359450710",
    measurementId: "G-EXWYJJTXR3"
  };
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}
const db = firebase.firestore();

const username = localStorage.getItem('username');
const gender = localStorage.getItem('gender');
const total = 1;
const rand = Math.floor(Math.random() * total); //0<=rand<total

db.collection("travel").where('num', '==', rand).get()
  .then(function(querySnapshot){
      querySnapshot.forEach(function(doc){
          console.log(doc.data());
          localStorage.setItem('place', doc.data().place);
          localStorage.setItem('landmark', doc.data().landmark);
          localStorage.setItem('startCoordLat', doc.data().startCoord._lat);
          localStorage.setItem('startCoordLng', doc.data().startCoord._long);
          localStorage.setItem('destCoordLat', doc.data().destCoord._lat);
          localStorage.setItem('destCoordLng', doc.data().destCoord._long);
      });
  })
  .catch(function(error){
      console.log("Error getting documents: ", error);
  });