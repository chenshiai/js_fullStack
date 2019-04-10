// function scramble(str1, str2) {
//   var s1 = str1.split('');
//   var s2 = str2.split('');
//   return s2.filter(x => {
//     if(s1.indexOf(x) == -1){
//       return true;
//     }else{
//       s1.splice(s1.indexOf(x),1);
//       return false;
//     }
//   }).length==0?true:false;
//  }
function scramble(str1, str2) {
  if(str1.length<str2.length) return false;

  var s1 = str1.split('');
  var s2 = str2.split('');
  for(w in s2){
    s2.map(w => s1.splice)
  }
  console.log(s1,s2);
}
console.log(scramble('rkqodlw','world'));