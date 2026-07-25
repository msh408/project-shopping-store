const setCookie = (token)=>{

    document.cookie = 
    `token=${token}; max-age=${24*60*60}; path=/`;

}


const getCookie = ()=>{

    const cookies = document.cookie;

    if(!cookies) return false;

    const token = cookies
    .split("; ")
    .find(item => item.startsWith("token="));


    if(!token) return false;


    return token.split("=")[1];

}


const removeCookie = ()=>{

    document.cookie =
    "token=; max-age=0; path=/";

}


export {
    setCookie,
    getCookie,
    removeCookie
}
