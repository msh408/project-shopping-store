import { getCookie } from "./cookie.js";


const authHandler = ()=>{

    const cookie = getCookie();

    const url = location.pathname;


    if(cookie && url.includes("auth.html")){

        location.assign("header.html");

    }


    if(!cookie && url.includes("dashboard.html")){

        location.assign("auth.html");

    }

}


export {authHandler};