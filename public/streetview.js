function initPano() {
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
  
  // var place = ['paris', 'new york'];
  // var destLatLng = [{lat: 48.859229, lng : 2.293217}, {lat: 41.890130, lng : 12.492220}];
  // const startLatLng = [{lat: 48.8580206, lng: 2.2813881}, {lat: 41.884898, lng: 12.489241}];
  // const rand = Math.floor(Math.random() * 2); //0<=rand<=1
  const gender = localStorage.getItem('gender');
  const username = localStorage.getItem('username');
  const num = localStorage.getItem('num');
  const place = localStorage.getItem('place');
  const landmark = localStorage.getItem('landmark');
  const startCoordLat = parseFloat(localStorage.getItem('startCoordLat'));
  const startCoordLng = parseFloat(localStorage.getItem('startCoordLng'));
  const destCoordLat = parseFloat(localStorage.getItem('destCoordLat'));
  const destCoordLng = parseFloat(localStorage.getItem('destCoordLng'));
  console.log(startCoordLat, startCoordLng, destCoordLat, destCoordLng);

    
  // document.getElementById("floating-panel").style.display = "block";
  // var tenseconds=10, display=document.querySelector('#time');
  // startTimer(tenseconds, display);
  //document.getElementById('shutter').play();
  //   var audio = document.createElement("AUDIO")
  //   document.body.appendChild(audio);
  //   audio.src = "./audio/shutter.wav"
  //   document.body.addEventListener("mousemove", function () {
  //     audio.play()
  // })
  

  var succ = false;
  var far = false;
  const panorama = new google.maps.StreetViewPanorama(
    document.getElementById("pano"),
    {
      position: {lat: startCoordLat, lng: startCoordLng},
      pov: {
      heading: 270,
      pitch: 0,
      },
      visible: true,
      linksControl: false,
      panControl: false,
      enableCloseButton: false,
    }
  );
    
  panorama.addListener("position_changed", () => {
    var newPosition = panorama.getPosition();
    const newLat = newPosition.lat();
    const newLng = newPosition.lng();
    //console.log('changed position to: ', newLat, newLng);
    console.log('coordinate diff: ', newLat-destCoordLat, newLng-destCoordLng);

    if(Math.abs(newLat-destCoordLat)<0.001 && Math.abs(newLng-destCoordLng)<0.001) {
      if(!succ){
        var audio = new Audio('audio/shutter.wav');
        audio.play();
        // alert(`Congratulations, you've found ` + landmark + `!\nReturning home after 10 seconds`);
        console.log(`return home`);
        db.collection("user").where('username', '==', username).get()
        .then(function(querySnapshot){
          querySnapshot.forEach(function(doc){
            console.log(doc.data().travels);
            var array = doc.data().travels;
            array[num]=true;

            localStorage.setItem("travels", array);

            db.collection("user").doc(doc.id).update({
              travels: array
            }).then(()=>{
              console.log("succ");
            }).catch((error)=>{
              console.log(error);
            })

          });
        })
        .catch(function(error){
          console.log("Error getting documents: ", error);
        });

        showScript(false);

        succ = true;
      }
    }

    if(Math.abs(newLat-destCoordLat)>0.5 || Math.abs(newLng-destCoordLng)>0.5){
      if(!far){
        alert(`Oh no you're getting farther away!`);
        far = true;
      }
    } else {
      far = false;
    }
  });

  const seal = document.getElementById("seal");
  seal.addEventListener("click", ()=>{
    location.href="wallpaper.html"
  });

  const backgroundT = document.getElementById("backgroundT");
  backgroundT.addEventListener("click", () => {
    closeScript();
  });

  const smallScript = document.getElementById("smallScript");
  smallScript.addEventListener("click", () => {
    showScript(true);
  });

}

  function showScript(temp){
    if(temp){
      var audio2 = new Audio('audio/paper.wav');
      audio2.play();
    }
    document.getElementById("bigScript").style.display = "block";
    document.getElementById("seal").style.display = "block";
    document.getElementById("backgroundT").style.display = "block";
    const landmark = localStorage.getItem('landmark');
    document.getElementById("smallScript").style.display = "none";

    var temp = `<p class="letter2" style="font-size: 40px; margin-bottom:70px">Contratulations!</p>
          <p class="letter2">You have successfully found "${landmark}"</p>
          <p class="letter3">If you wish to return home,</b></p>
          <p class="letter4" style="margin-bottom:70px">touch the seal.</b></p>
          <p class="letter5">Yours sincerely,</p>
          <p class="letter6" style="font-family: 'Homemade Apple', cursive;">Bridge to Memory</p>`;
    $('.message').append(temp);
  }

  function closeScript(){
    var audio2 = new Audio('audio/paper.wav');
    audio2.play();
    document.getElementById("bigScript").style.display = "none";
    document.getElementById("seal").style.display = "none";
    document.getElementById("backgroundT").style.display = "none";
    document.getElementById("smallScript").style.display = "block";
    const element = document.getElementById('message');
    element.innerText = '';
  }

  function startTimer(duration, display){
    var start = Date.now(),
    diff,
    minutes,
    seconds;

    function timer() {
      // get the number of seconds that have elapsed since 
      // startTimer() was called
      diff = duration - (((Date.now() - start) / 1000) | 0);

      // does the same job as parseInt truncates the float
      //minutes = (diff / 60) | 0;
      seconds = (diff % 60) | 0;

      //minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = seconds; 

      if (diff <= 0) {
          // add one second so that the count down starts at the full duration
          // example 05:00 not 04:59
          start = Date.now() + 1000;
      }
    };
    // we don't want to wait a full second before the timer starts
    timer();
    setInterval(timer, 1000);
  }