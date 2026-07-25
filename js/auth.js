import { setCookie } from "./cookie.js";
import { postData } from "./httpRequest.js";
import { validationForm } from "./validation.js";


const inputBox = document.querySelectorAll("input");

const form = document.querySelector("form");


const submitHandler = async(e)=>{

    e.preventDefault();


    const username = inputBox[0].value;
    const password = inputBox[1].value;


    if(!validationForm(username,password))
        return;


    const data = {
        username,
        password
    };


    const response = await postData(
        "auth/login",
        data
    );


    console.log(response);


    if(!response || !response.token){

        alert("Login failed");

        return;

    }


    setCookie(response.token);


   location.assign("./dashboard.html");

}



form.addEventListener(
    "submit",
    submitHandler
);