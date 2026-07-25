import { getCookie } from "./cookie.js";
import { getData } from "./httpRequest.js";
const loginButton=document.getElementById("login");
const dashboard=document.getElementById("dashboard");
const mainContent=document.getElementById("products");
const searchButton=document.querySelector("button");
const searchInput=document.querySelector("input");
const listItems=document.querySelectorAll("li");
let allProduct=null
const init= async()=>{
    const cookie=getCookie();
    if(cookie){
       loginButton.style.display="none" 
    }
    else{
        dashboard.style.display="none"
    }
     allProduct=await getData('products');
    showProducts(allProduct);
}

//display products
const showProducts = (products)=>{

    mainContent.innerHTML = "";

    products.forEach((product)=>{

        const jsx = `
        <div class="product">

            <img 
                src="${product.image}" 
                alt="${product.title}"
            />

            <div class="product-body">

                <h3>
                    ${product.title}
                </h3>


                <div class="price">
                    <span>
                        $${product.price}
                    </span>
                </div>


                <div class="rating">

                    <span>
                        <i class="bi bi-star-fill"></i>
                        ${product.rating.rate}
                    </span>

                    <small>
                        <i class="bi bi-person"></i>
                        ${product.rating.count}
                    </small>

                </div>


                <button class="buy-btn">
                    Buy
                    <i class="bi bi-bag"></i>
                </button>


            </div>

        </div>
        `;

        mainContent.innerHTML += jsx;

    });

}
const searchHandler=()=>{
 const query=searchInput.value.trim().toLocaleLowerCase();
 if(!query) return showProducts(allProduct);
 const filterProducts=allProduct.filter((product)=>{
    return product.title.toLocaleLowerCase().includes(query)})
 showProducts(filterProducts);
}
const filterHandler = (event) => {

    const category = event.target.innerText.toLowerCase();

    // تغییر حالت selected
    listItems.forEach((li) => {

        li.classList.remove("selected");

    });

    event.target.classList.add("selected");


    // اگر ALL انتخاب شد
    if (category === "all") {

        showProducts(allProduct);

        return;

    }


    // فیلتر محصولات
    const filterProduct = allProduct.filter((product) => {

        return product.category.toLowerCase() === category;

    });


    showProducts(filterProduct);

};

listItems.forEach(li=>li.addEventListener("click",filterHandler))
searchButton.addEventListener("click",searchHandler);
document.addEventListener("DOMContentLoaded",init)