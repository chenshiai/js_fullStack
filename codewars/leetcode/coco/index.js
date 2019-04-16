// 位运算符（右移）
// 二进制位
// 0000 1011
// 0000 0101
// console.log(11 >> 1);

// 0001 0110
// console.log(11 << 1);
// 利用位移运算 实现 /2 *2 的效果

// 猛哥给蜗牛买香蕉
// N piles of bananas 每挂香蕉上的香蕉数量不一样
// [3, 6, 7, 11], H 小时内吃完 一小时吃几根
// 一小时内吃mid根香蕉, 一次只能吃一把, 一小时最少吃几个，可以再H小时内吃完
/**
 * 
 * @param {number[]} piles 
 * @param {number} H
 * @return {number} 
 */
function minEatingSpeed(piles, H){
  let maxM = Math.max(...piles);
  let lo = Math.min(...piles);
  while(lo <= maxM){
    let mid = lo + ((maxM - lo) >> 1);
    if(canEatAllBananas(piles, H, mid)){
      maxM = mid - 1;
    } else {
      lo = mid + 1
    }
  }
  return lo;
}

/**
 * 
 * @param {number[]} piles 
 * @param {number} H 
 * @param {number} mid
 * @return {boolean}
 */
function canEatAllBananas(piles, H, mid){
  let h = piles.reduce((sum,val) => sum = sum + Math.ceil(val / mid), 0)
  return h <= H;
}
console.log(minEatingSpeed([3, 6, 7, 11], 8))