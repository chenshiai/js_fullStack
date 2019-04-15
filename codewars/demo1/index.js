function generateHashtag(str){
    if(str===""||str===null){
        return false;
    }
    var str1 = str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase()).replace(/ /g,'');
    return str1.length>139 || str1 === "" ? false : "#" +  str1;
}
console.log(generateHashtag("a".repeat(140)));