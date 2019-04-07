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
    var a = 1, b = 2, temp = 0;

    for (let i = 3; i <= num; i++) {
        temp = a + b;
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
    while (n > 1) {
        num = num + Math.pow(Math.floor(n) % 10, p);
        n /= 10;
        p--;
    }
    if (Number.isInteger(num / nn)) {
        console.log(num / nn);
    } else {
        console.log(-1);
    }
}
function digPow1(n, p) {
    var x = String(n).split("").reduce((s, d, i) => s + Math.pow(d, p + i), 0)
    return x % n ? -1 : x / n
}
function digital_root(n) {
    var x = String(n).split("").reduce((s, d) => Number(s) + Number(d), 0);
    return n < 10 ? n : digital_root(x);
    // return (n - 1) % 9 + 1; 纯数学方法
}
function order(words) {
    // var arr = words.split(" ").map(a => a.replace(/[^0-9]/ig,""));
    // var newStr = new Array(arr.length);
    // for(w in arr){
    //     newStr[arr[w]-1] = words.split(" ")[w];
    // }
    // return newStr.join(' ');

    return words.split(' ').sort(function(a, b){
        return a.match(/\d/) - b.match(/\d/);
        // \d 表示数字 a.match(/\d/)表示取数字部分出来
     }).join(' ');
}
console.log(order("is2 Thi1s T4est 3a"));