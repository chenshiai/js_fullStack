function generateHashtag(str){
    return (str.length>140||str===""||str===null) ?  false :  "#" + str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());  
}
console.log(generateHashtag("How are you"));