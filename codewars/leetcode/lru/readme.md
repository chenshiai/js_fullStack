LRU Least Recently Used 最近最少使用原则
操作系统的内存中
node fs
硬盘 
  内存 CPU 小 快 N
  容量是多少 超过容量后淘汰的机制

  meet 缓存
  LRUCache
  1 put 存入 [下标 值]
  {key:val}
  put(1, 1)
  put(2, 2)
  put(3, 3) 1先移除 3再放进来
  put(4, 4) 2先移除 4再进来
  get(3, 3)
  数组[1,2,3,4]
  对象{1:1,2:2,3:3,4:4} 0(1)

  对象字面量 存取的数据结构
