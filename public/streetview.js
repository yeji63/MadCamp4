function initPano() {
    // var place = ['paris', 'new york'];
    // var destLatLng = [{lat: 48.859229, lng : 2.293217}, {lat: 41.890130, lng : 12.492220}];
    // const startLatLng = [{lat: 48.8580206, lng: 2.2813881}, {lat: 41.884898, lng: 12.489241}];
    // const rand = Math.floor(Math.random() * 2); //0<=rand<=1
    const place = localStorage.getItem('place');
    const landmark = localStorage.getItem('landmark');
    const startCoordLat = parseFloat(localStorage.getItem('startCoordLat'));
    const startCoordLng = parseFloat(localStorage.getItem('startCoordLng'));
    const destCoordLat = parseFloat(localStorage.getItem('destCoordLat'));
    const destCoordLng = parseFloat(localStorage.getItem('destCoordLng'));
    console.log(startCoordLat, startCoordLng, destCoordLat, destCoordLng);

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

        if(Math.abs(newLat-destCoordLat)<0.0008 && Math.abs(newLng-destCoordLng)<0.0008) {
            if(!succ){
                let ret = confirm(`Congratulations, you've found` + landmark + `! Would you like to return home?`);
                if(ret) console.log(`return home`);
                else console.log(`want to play more`);
                console.log('current position: ', newLat, newLng);
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