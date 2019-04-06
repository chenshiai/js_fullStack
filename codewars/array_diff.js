function array_diff(a, b) {
  return a.filter(function(x) { return b.indexOf(x) == -1; });
}
/*
* 判断b数组中是否有a数组中的元素x，如果有，则b.indexOf(x)返回>=0的数。否则返回错误(-1)
* filter 接受ture或false,ture则将x存入一个新的数组
*/
console.log(array_diff([1, 2, 2, 3], [2]));