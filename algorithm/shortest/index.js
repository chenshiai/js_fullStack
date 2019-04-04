function findShort0(str) {
    return str.split(' ')
        .map(a => a.length)
        .sort((a, b) => a - b)[0];
}
function findShort(str) {
    return Math.min(...str.split(' ').map(w => w.length))
}
function findShort1(str) {
    return Math.min.apply(null, str.split(' ').map(w => w.length))
}
// console.log(findShort1("bitcoin take over the world maybe who knows perhaps"));
function tribonacci(signature, n) {
    if (n >= 3) {
        for (let i = 0; i < n - 3; i++) {
            signature.push(signature[i] + signature[i + 1] + signature[i + 2]);
        }
    }
    return signature.slice(0, n);
}
function findMissingLetter(array) {
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i + 1].charCodeAt() - array[i].charCodeAt() > 1) {
            return String.fromCharCode((array[i].charCodeAt() + 1));
        }
    }
    return NaN;
}
// console.log(findMissingLetter(['O','Q','R','S']));
function longestConsec(strarr, k) {
    var arr = [];
        
    if(k>strarr.length||strarr.length==0||k<=0){
        return "";
    }
    for (let i = 0; i < strarr.length-k+1; i++) {
        var str = "";
        for(let j=0;j<k;j++){
            str += strarr[i+j];
        }
        arr.push(str);
    }
    var over = arr[0];
    for(let i=0;i<arr.length-1;i++){
        if(arr[i].length<arr[i+1].length){
            over = arr[i+1];
        }
    }
    return over;
}
console.log(longestConsec(["aaa", "bbb", "ccc", "ddd", "fff"], 2));