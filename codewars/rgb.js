function rgb(r, g, b){
  // complete this function
  // var str = new Array();
  // for (v in arguments){
  //   if(arguments[v]<0){
  //     str.push("00");
  //   }else if(arguments[v]>255){
  //     str.push("FF");
  //   }else{
  //     str.push(arguments[v].toString(16).toUpperCase());
  //   }
  // }
  // return str.join('');

  return [...arguments].reduce((str,w)=>{
    var nowStr = w<=0?"00":(w>255?"FF":w).toString(16);
    if(nowStr.length==1){
      nowStr = '0' + nowStr;
    }
    return str += nowStr.toUpperCase();
  },"")
}
console.log(rgb(116,15,139));