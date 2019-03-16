- 函数有多种运行方式
    Player() 普通方式运行，
    new Player() 作为构造函数被运行，会有一个返回新对象实例。
    function Person(){}

- 函数是一等对象，可以被执行的对象。
    this 借助它来构建新的对象
    var player1 = new Person()
    this => player1 Person {}

- new 的过程
    this 空对象Person{}
    Person() 构造函数
    this.name = name 添加一个名为name的属性