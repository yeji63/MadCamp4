var travels = new Array();
travels = localStorage.getItem('travels').split(",");
console.log(travels);

for(let i = 0; i < 6; i++){
    console.log(travels[i]);
    if(travels[i] == "true"){
        var imagename = "img" + i;
        console.log(imagename);
        document.getElementById(imagename).style.display = "block";
    }else{
        var imagename = "img" + (i+10);
        console.log(imagename);
        document.getElementById(imagename).style.display = "block";
    }
}

