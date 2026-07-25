const BASE_URL="https://fakestoreapi.com";
const postData=async(path,data)=>{
    try{
        const response=await fetch(`${BASE_URL}/${path}`,{
         method: 'POST',
        headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(data)
})
        const json=await response.json();
        return json;
    }catch(error){
        alert("An error");
    }  
}

const getData= async(path)=>{
    try{
        const response= await fetch(`${BASE_URL}/${path}`)
        const json=await response.json();
        return json;
    }catch(error){
        alert("not response")
    }
    
}
export{postData , getData};
