var empty1 = 2;
var empty2 = 2;
var arr = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
];
const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
]
function panduan(i, j) {
    if (i == empty1) {
        if (Math.abs(j - empty2) == 1) {
            return true;
        }
    } else if (Math.abs(i - empty1) <= 1) {
        if (j == empty2) {
            return true;
        }
    }
    return false;
}
function change(num) {
    let i = Math.floor(num / 3);
    let j = num - i * 3;
    if (panduan(i, j)) {
        let x = arr[i][j];
        arr[i][j] = arr[empty1][empty2];
        arr[empty1][empty2] = x;
        empty1 = i;
        empty2 = j;
        return true;
    } else {
        return false;
    }
}
function winbol() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (arr[i][j] != win[i][j]) {
                return false;
            }
        }
    }
    setTimeout(() => {
        alert("YOU WIN!");
        $('.all-image').addClass('blink');
        $('.image-item').css('transform', 'scale(1)');
        $('.empty').addClass('item8').removeClass('empty');
    }, 100);
    $('.all-image').removeClass('blink');
}
function automove(allnum) {
    let count = 0;
    for (let i = 0; i < 50; count++) {
        let ind = Math.floor(Math.random() * allnum);
        if (change(ind)) {
            i++;
        }
    }
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let autoIndex = arr[i][j];
            let num = i * 3 + j;
            if (autoIndex != 8) {
                $('.image-item').eq(num).children().attr('class', 'img item' + autoIndex);
            } else {
                $('.image-item').eq(num).children().attr('class', 'img empty');
            }
        }
    }
}
automove(9);
$(document).ready(function () {
    $('.image-item').click(function () {
        let now = $(this).index();
        if (change(now)) {
            var imgclass = $(this).children().attr('class');
            var item33 = $('.empty').attr('class');
            $('.empty').attr('class', imgclass);
            $(this).children().attr('class', item33);
            winbol();
        }
    })
})
function creatGame(dex) {
    myarr = new Array(); //先声明一维 
    let num = 0;
    for (var i = 0; i < dex; i++) { //一维长度为dex
        myarr[i] = new Array(); //再声明二维 
        for (var j = 0; j < dex; j++ , num++) { //二维长度为dex
            myarr[i][j] = num; // 赋值，每个数组元素的值为i+j
        }
    }
    Array.prototype.clone = function () {
        return [].concat(this);
        //或者 return this.concat();
    }
    mywin = myarr.clone();
    console.log(myarr, mywin)
}
creatGame(4);