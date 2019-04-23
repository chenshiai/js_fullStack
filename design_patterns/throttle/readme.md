函数的节流和防抖

阿里js面试第一题
- 搜索建议
  google suggest
  根据input里的value 进行ajax
  这是有问题的
  用分词 灭霸 电蚊液
  keyup没有必要每次都触发ajax 太浪费性能
  过滤一些无效的请求 输入完一个单词再去搜索
- 防抖的关键
  频繁输入时， 怎么减少请求呢
  debounce(func, 500) 生成一个函数
  控制执行，停止输入时，执行一次
  setTimeout delay 之后一定会执行一次
  再规定时间内 被clear掉
  clearTimeout(func.id);
    func.id = setTimeout(() => {
      func(args);
    }, delay);
    setTimeout 返回句柄, 不重复的数字
  func 函数是对象。添加一个属性
  前一次加了一个setTimeout 下一次清除