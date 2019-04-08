function findOdd(A) {
  //happy coding!
  var arr = A.sort((a,b)=>a-b);
  for(let i=0;i<arr.length;i++){
    if(arr[i]==arr[i+1]){
      i++;
    }else{
      return arr[i];
    }
  }
}
const findOdd1 = (xs) => xs.reduce((a, b) => a ^ b);
// 找出现次数为奇数的元素（只有一个）
console.log(findOdd1([20,1,-1,2,-2,3,3,5,5,1,2,4,20,4,-1,-2,5]));

console.log("NOT运算",~3);
// 位运算 NOT 实质上是对数字求负，然后减 1，因此 25 变 -26。用下面的方法也可以得到同样的方法：

console.log("AND运算",25 & 3);
// && 二进制 上下都为1则结果为1，若有一个为0则结果为0

console.log("OR运算",25 | 3);
// || 二进制 上下有一个为1则结果为1，若都为0则结果为0

console.log("XOR运算",25 ^ 3);
// 异或 二进制 上下两值相同结果为0，不同则结果为1