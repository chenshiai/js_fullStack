var LRUCache = function (capacity) {
  this.capacity = capacity; //容量
  this.obj = {}; // 存放
  // 开头 结尾
  this.arr = [];
}
LRUCache.prototype.get = function(key){
  var val = this.obj[key];
  if(val > 0){
    return val;
  } else {
    
  }
}
LRUCache.prototype.set = function(key, val){
  //之前已存在
  if(this.obj[key]){
    this.obj[key] = val;
    var index = this.arr.indexOf(key);
    this.arr.splice(index, 1);
    this.arr.unshift(key);
    return;
  }

  if(this.capacity === this.arr.length){
    // 满了
    var k = this.arr.pop();
    this.obj[k] = undefined;
  }
  this.obj[key] = val; //存好了
  this.arr.unshift(key);//最近最常使用
}