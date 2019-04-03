function lou2(n) {
    if (n === 1) {
        return 1;
    }
    if (n === 2) {
        return 2;
    }
    if (n === 0) {
        return 0;
    }
    var a = 1,b = 2, temp = 0;

    for(let i=3;i<=num;i++){
        temp = a+b;
        a = b;
        b = temp;
    }
    return temp;
}
function digPow(n, p) {
    let num = n;
    let nn = n;
    while (num > 1) {
        num /= 10;
        p++;   
    }
    p--;
    num = 0;
    while(n>1){
        num = num + Math.pow(Math.floor(n) % 10, p);
        n /= 10;
        p--;
    }
    if (Number.isInteger(num / nn)) {
        console.log( num / nn);
    }else{
        console.log(-1);
    }
}
function digPow1(n, p) {
    var x = String(n).split("").reduce((s, d, i) => s + Math.pow(d, p + i), 0)
    return x % n ? -1 : x / n
  }
  digPow1(89,1);