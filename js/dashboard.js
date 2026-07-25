import { authHandler } from "./authHandler.js"
import { getData } from "./httpRequest.js";
import { removeCookie } from "./cookie.js";


const mainContainer=document.querySelector("#container");
const logoutBtn=document.querySelector("#logoutBtn");
const init= async()=>{
  authHandler();
  const user=await getData("users");
  render(user)
  console.log(user)
}
const render = (users) => {

    mainContainer.innerHTML = "";

    users.forEach(user => {

        mainContainer.innerHTML += `
            <div class="card">

                <h3>${user.id}</h3>

                <div>
                    <p><i class="bi bi-person"></i> Name:</p>
                    <span>${user.name.firstname} ${user.name.lastname}</span>
                </div>

                <div>
                    <p><i class="bi bi-person-badge"></i> Username:</p>
                    <span>${user.username}</span>
                </div>

                <div>
                    <p><i class="bi bi-envelope"></i> Email:</p>
                    <span>${user.email}</span>
                </div>

                <div>
                    <p><i class="bi bi-telephone"></i> Phone:</p>
                    <span>${user.phone}</span>
                </div>

                <div>
                    <p><i class="bi bi-geo-alt"></i> Address:</p>
                    <span>
                        ${user.address.city},
                        ${user.address.street},
                        ${user.address.zipcode}
                    </span>
                </div>

            </div>
        `;

    });

}


const logoutHandler = ()=>{

    removeCookie();

    console.log(document.cookie); // باید خالی باشد

    location.assign("./auth.html");

}
logoutBtn.addEventListener("click",logoutHandler)

document.addEventListener("DOMContentLoaded",init)
