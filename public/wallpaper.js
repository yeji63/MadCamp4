var travels = new Array();
travels = localStorage.getItem('travels').split(",");
console.log(travels);

for(let i = 0; i < 6; i++){
    console.log(travels[i]);
    if(travels[i] == "true"){
        var imagename = "img" + i;
        console.log(imagename);
        document.getElementById(imagename).style.display = "block";

        var temp = "img" + (i+10);
        console.log(temp);
        document.getElementById(temp).style.display = "none";

    }else{
        var imagename = "img" + (i+10);
        console.log(imagename);
        document.getElementById(imagename).style.display = "block";

        var temp = "img" + i;
        console.log(temp);
        document.getElementById(temp).style.display = "none";
    }
}



$(".img0").click(function(){
    document.getElementById("backgroundT").style.display = "block";
    document.getElementById("img0").style.display="none";
    document.getElementById("big0").style.display="block";
    
    const backgroundT = document.getElementById("backgroundT");
    backgroundT.addEventListener("click", () => {
        document.getElementById("backgroundT").style.display = "none";
        document.getElementById("img0").style.display="block";
        document.getElementById("big0").style.display="none";
    });
})
$(".img1").click(function(){
    document.getElementById("backgroundT").style.display = "block";
    document.getElementById("img1").style.display="none";
    document.getElementById("big1").style.display="block";
    
    const backgroundT = document.getElementById("backgroundT");
    backgroundT.addEventListener("click", () => {
        document.getElementById("backgroundT").style.display = "none";
        document.getElementById("img1").style.display="block";
        document.getElementById("big1").style.display="none";
    });
})
$(".img2").click(function(){
    document.getElementById("backgroundT").style.display = "block";
    document.getElementById("img2").style.display="none";
    document.getElementById("big2").style.display="block";
    
    const backgroundT = document.getElementById("backgroundT");
    backgroundT.addEventListener("click", () => {
        document.getElementById("backgroundT").style.display = "none";
        document.getElementById("img2").style.display="block";
        document.getElementById("big2").style.display="none";
    });
})
$(".img3").click(function(){
    document.getElementById("backgroundT").style.display = "block";
    document.getElementById("img3").style.display="none";
    document.getElementById("big3").style.display="block";
    
    const backgroundT = document.getElementById("backgroundT");
    backgroundT.addEventListener("click", () => {
        document.getElementById("backgroundT").style.display = "none";
        document.getElementById("img3").style.display="block";
        document.getElementById("big3").style.display="none";
    });
})
$(".img4").click(function(){
    document.getElementById("backgroundT").style.display = "block";
    document.getElementById("img4").style.display="none";
    document.getElementById("big4").style.display="block";
    
    const backgroundT = document.getElementById("backgroundT");
    backgroundT.addEventListener("click", () => {
        document.getElementById("backgroundT").style.display = "none";
        document.getElementById("img4").style.display="block";
        document.getElementById("big4").style.display="none";
    });
})
$(".img5").click(function(){
    document.getElementById("backgroundT").style.display = "block";
    document.getElementById("img5").style.display="none";
    document.getElementById("big5").style.display="block";
    
    const backgroundT = document.getElementById("backgroundT");
    backgroundT.addEventListener("click", () => {
        document.getElementById("backgroundT").style.display = "none";
        document.getElementById("img5").style.display="block";
        document.getElementById("big5").style.display="none";
    });
})

$(".img10").click(function(){
    localStorage.setItem('num', 0);
    localStorage.setItem('place', "Italy");
    localStorage.setItem('landmark', "The Leaning Tower of Pisa");
    localStorage.setItem('startCoordLat', "43.722418");
    localStorage.setItem('startCoordLng', "10.400703");
    localStorage.setItem('destCoordLat', "43.722921");
    localStorage.setItem('destCoordLng', "10.396553");
    location.href="streetview.html";
})
$(".img11").click(function(){
    localStorage.setItem('num', 1);
    localStorage.setItem('place', "Paris");
    localStorage.setItem('landmark', "The Eiffel Tower");
    localStorage.setItem('startCoordLat', "48.8580206");
    localStorage.setItem('startCoordLng', "2.2813881");
    localStorage.setItem('destCoordLat', "48.859229");
    localStorage.setItem('destCoordLng', "2.293217");
    location.href="streetview.html";
})
$(".img12").click(function(){
    localStorage.setItem('num', 2);
    localStorage.setItem('place', "Egypt");
    localStorage.setItem('landmark', "Great Pyramid of Giza");
    localStorage.setItem('startCoordLat', "29.975994");
    localStorage.setItem('startCoordLng', "31.137197");
    localStorage.setItem('destCoordLat', "29.979071");
    localStorage.setItem('destCoordLng', "31.134225");
    location.href="streetview.html";
})
$(".img13").click(function(){
    localStorage.setItem('num', 3);
    localStorage.setItem('place', "Australia");
    localStorage.setItem('landmark', "Mutitjulu Waterhole");
    localStorage.setItem('startCoordLat', "-25.349744");
    localStorage.setItem('startCoordLng', "131.049337");
    localStorage.setItem('destCoordLat', "-25.351335");
    localStorage.setItem('destCoordLng', "131.032643");
    location.href="streetview.html";
})
$(".img14").click(function(){
    localStorage.setItem('num', 4);
    localStorage.setItem('place', "USA, Canada");
    localStorage.setItem('landmark', "Niagara Falls");
    localStorage.setItem('startCoordLat', "43.086798");
    localStorage.setItem('startCoordLng', "-79.071875");
    localStorage.setItem('destCoordLat', "43.082762");
    localStorage.setItem('destCoordLng', "-79.074139");
    location.href="streetview.html";
})
$(".img15").click(function(){
    localStorage.setItem('num', 5);
    localStorage.setItem('place', "Singapore");
    localStorage.setItem('landmark', "Marina Bay Sands");
    localStorage.setItem('startCoordLat', "1.291355");
    localStorage.setItem('startCoordLng', "103.859812");
    localStorage.setItem('destCoordLat', "1.284567");
    localStorage.setItem('destCoordLng', "103.860981");
    location.href="streetview.html";
})
