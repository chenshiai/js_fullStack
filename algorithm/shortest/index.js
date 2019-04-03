function findShort0(str){
    return str.split(' ')
        .map(a => a.length)
        .sort((a,b)=>a-b)[0];
}
function findShort(str){
    return Math.min(...str.split(' ').map(w => w.length))
}
function findShort1(str){
    return Math.min.apply(null,str.split(' ').map(w => w.length))
}
console.log(findShort1("bitcoin take over the world maybe who knows perhaps"));