/* 
* object 类
* JSON object 难以完成此job
* es5 之前没有class关键字
* 如果一个函数首字母大写约束。
* 可以区别于普通函数运行的方式 new，成为构造函数。
* js的函数与其他语言不一样，函数内部一定会存在一个this指针。
* 函数是js的一等对象。js除了基本数据类型之外，都是对象Object,函数是可以被运行的对象。
*/

function Player(name){
    this.name = name;
    this.enemy = null;
    console.log(this.name + "上线了。");
}
Player.prototype.win = function(){
    console.log(this.name + "win!");
}
Player.prototype.lose = function(){
    console.log(this.name + "lose!");
}
//将类实例化 类是一个抽象的概念，对象可以new 出来。
//new的时候会生成一个this，指向实例化后的对象。
var player1 = new Player("皮蛋");
var player2 = new Player("小乖");
player1.enemy = player2;
player2.enemy = player1;
player1.win();
player2.lose();