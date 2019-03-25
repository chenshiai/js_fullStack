new js 关键字
运算符创建一个用户定义的关键对象
1. 构造函数上有prototype属性，值为对象
2. 类 由构造函数 + prototype原型对象

3. typeof 类型 instanceof 判断某个对象是否为某个类的实例
new 返回一个新的对象，具有构造函数里的属性
对象要有原型对象，指向构造函数的原型对象

1. 空对象来了 new Object()
2. 将构造函数里的属性交给空对象
    constructor 本身就是为对象服务的
    函数内部的this 是由函数运行时的方式决定的
    new Otaku()
    Otaku.call(obj,...);
    call apply 可以指定函数运行时的this，手动指向obj

3. constructor构造函数 拥有 prototype属性
    在上面添加属性和方法，可以被实例引用到。
    对象上有__proto__属性 这个对象的原型对象是谁？
    对象也可以拿到原型对象上的属性或方法

JS的面向对象是基于原型的