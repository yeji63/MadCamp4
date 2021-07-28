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
    // var audio = new Audio('audio/shutter.wav');
    // audio.play();

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
                alert(`Congratulations, you've found ` + landmark + `!\nReturning home after 10 seconds`);
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

                  // var audio = new Audio('audio/shutter.wav');
                  // audio.play();

                  document.getElementById("timer").style.display = "block";
                  document.getElementById("floating-panel").style.display = "block";
                  var tenseconds=10, display=document.querySelector('#time');
                  startTimer(tenseconds, display);

                  setTimeout(function(){
                    location.href="wallpaper.html"
                  }, 10000);

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