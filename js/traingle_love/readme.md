构造函数 Constructor
prototype 原型
实例 instance

JS没有类，只有对象，所有的一切都是通过原型拿到的

通过构造函数生成了一个实例
同时在构造函数的原型（prototype）上定义了一个方法

1. 任何对象都有__proto__私有属性，实例和类之间没有血缘关系
2. 构造函数有prototype属性
3. 原型对象上有constructor属性