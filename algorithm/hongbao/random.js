// let ran_num = Math.random();

//()=>{}函数表达式
const hongbao = (total,num)=>{
    const arr = [];//待分配的金额
    //定义计算量
    let restAmount = total, restNum = num;
    for(let i = 0;i<num-1;i++){
        //前n-1个人发随机金额
        //(restAmount/restNum)*2 每人的随机金额最大值为平均值的两倍
        let amount = parseFloat(Math.random()*((restAmount/restNum)*2-0)).toFixed(2);
        restAmount -=amount;
        restNum--;
        arr.push(amount);
    }
    arr.push(restAmount.toFixed(2));
    return arr;
}
console.log(hongbao(200,10));