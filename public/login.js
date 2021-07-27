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

function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}


function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        console.log("here");

        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;

        if(username.length != 0 && password.length != 0){
            db.collection("user").where('username', '==', username).get()
            .then(function(querySnapshot){
                querySnapshot.forEach(function(doc){
                    console.log(doc.id, "=>", doc.data());
                    if(doc.data().password == password){
                        localStorage.setItem('username', doc.data().username);
                        localStorage.setItem('gender', doc.data().gender);
                        location.href="index.html"
                    } else {
                        setFormMessage(loginForm, "error", "Invalid username/password combination");
                    }
                });
            })
            .catch(function(error){
                console.log("Error getting documents: ", error);
            });
        }       
    });

    createAccountForm.addEventListener("submit", e => {
        e.preventDefault();

        const username = document.getElementById("signupUsername").value;
        const password = document.getElementById("signupPassword").value;
        const gender = document.getElementById("signupGender").value;

        if(username.length == 0 || gender.length == 0 || password.length == 0){
            setFormMessage(createAccountForm, "error", "Invalid Signup");
        } else {
            db.collection("user").add({
                username: username,
                password: password,
                gender: gender
            })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                loginForm.classList.remove("form--hidden");
                createAccountForm.classList.add("form--hidden");
            })
            .catch((error) => {
                console.log("Error adding document: ", error);
            });
        }
    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        let temp = "";
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0) {}

            if(e.target.id === "signupGender" && e.target.value.length > 0) {
                if(e.target.value == "Mr." || e.target.value == "Mrs."){}
                else{
                    setInputError(inputElement, "Must choose from Mr. or Mrs.");
                }
            }

            if(e.target.id === "signupPassword" && document.getElementById("signupPassword").value.length > 0 && document.getElementById("signupPassword").value.length < 6){
                setInputError(inputElement, "Password must be at least 6 characters in length");
            }

            if(e.target.id === "signupConfirmPassword" && document.getElementById("signupConfirmPassword").value != document.getElementById("signupPassword").value){
                setInputError(inputElement, "Wrong password");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});