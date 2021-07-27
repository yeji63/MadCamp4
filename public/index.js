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

const total = 3;
const rand = Math.floor(Math.random() * total); //0<=rand<total

const username = localStorage.getItem('username');
const gender = localStorage.getItem('gender');

var temp;
var check=0;

db.collection("travel").where('num', '==', rand).get()
  .then(function(querySnapshot){
      querySnapshot.forEach(function(doc){
        console.log(username, gender);
          
        temp = `<p class="letter1" style="font-size: 35px;">Dear ${gender} ${username}</p>
            <p class="letter2">Welcome.</p>
            <p class="letter2">We are pleased to inform you that today,</p>
            <p class="letter3">you will be joining our facinating trip to <b>"${doc.data().place}"</b></p> 
            <p class="letter4">Your mission is to find the <b>"${doc.data().landmark}"</b></p>
            <p class="letter4">Good luck on your trip!</p>  
            <p class="letter5">Yours sincerely,</p>
            <p class="letter6" style="font-family: 'Homemade Apple', cursive;">MadCamp4</p>`;
       

        localStorage.setItem('num', doc.data().num);
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

document.addEventListener('click', function(){
    if(check==0){
        var template =  `<img src="image/pngwing.com.png" width="100%" height="100%"></img>`
        $('.paper').append(template)
    }
    else if (check==1){
        $('.letter').append(temp)
    }
    else if (check==2){
        location.href="streetview.html"
    }
    check++;
})

