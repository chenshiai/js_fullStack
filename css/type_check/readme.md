类型 typeof
复杂数据类型就是 object
Array 是可以遍历的对象
function 是可以运行的对象
JSON Object 对象字面量是可以枚举的对象 for(key in)

typeof 用来类型检测，半吊子。
typeof [] -> object 没有办法和json区分开来

有一个方法可以区分Array[]和JSON Object
1. 用JSON对象字面量来做面向对象 区别于原型式的
    它没有被实例化的需要 Type. 将在程序中就做这类检测
    var Type = {} 组织代码

2. for 来一次性的加完 同步异步的问题
    使用闭包来将type 作用于封闭起来
    立即执行函数，同步执行，类型检测函数的定义，因为函数嵌套函数，形成了闭包
    当函数再被调用时（异步），找到定义时刻的type

3. Object.prototype.toString.call()
    Object 祖先 ，顶级对象 函数才有prototype属性，原型上有toString的方法解决typeof的尴尬问题
    "[object xxxx]"
    方法的执行方式可以被改变
    Object.prototype.toString.call(obj)