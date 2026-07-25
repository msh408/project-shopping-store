const validationUsername=(username)=>{
    const regex=/^[a-zA-Z\d_]{4,16}$/;
    const result=regex.test(username)
    return result;
}
const validationPassword=(password)=>{
    const regex=/^.{4,10}$/
    const result=regex.test(password);
    return result;
}

const validationForm=(username,password)=>{
    const usernameResult=validationUsername(username);
    const passwordResult=validationPassword(password);
    if(usernameResult && passwordResult){
        return true;
    }else if(!usernameResult){
        alert("!username")
    }else if (!passwordResult){
        alert("!password")
    }
}
export{validationForm}