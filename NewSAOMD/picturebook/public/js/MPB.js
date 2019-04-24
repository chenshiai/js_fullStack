/**
 * SAOMDPB项目用对象字面量API
 * 作者：丨ConGreat
 * 起始时间：2019-04-23
 * 最后修改时间：2019-04-24
 */
var MPB = {
  /**
   * 如果多次调用重复的东西，对性能还是会有点影响的！
   * 所以，当第一次调用的时候创建一个实例存在这里。
   * 之后再次调用就直接用实例啦！
   */
  "Object": {
    xhr: null,
    ajax: null
  },
  /**
   * 只需一次调用就可获得兼容的XMLHttpRequest对象~
   */
  "XMLHttpRequest": function (bool) {
    if (MPB.Object.xhr === null) {
      var xhr = null;
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }
      MPB.Object.xhr = xhr;
    }
    return MPB.Object.xhr;
  },
  /**
   * 创建一个计时器队列对象。可以用来做防抖...嗯就是这样。
   * @function open(bool) 调用一次该计时器，参数bool默认false，所有计时器同步执行，
   * true则进行一次异步调用。
   * @function close() 直接关闭该对象上的所有计时器。
   * @param {function} abort_u 倒计时结束时调用的函数。
   * @param {number} time_u 倒计时时长,默认为0(毫秒)。
   */
  "Timer": function (abort_u, time_u) {
    var abort = abort_u,
      time = time_u,
      async = false,
      timer = null,
      asyncArr = [];
    function out() {
      if (asyncArr.length > 0) {
        timer = setTimeout(() => {
          asyncArr.shift()();
          out();
        }, time);
      }
    }

    if (typeof abort != "function") {
      throw new Error("计时器对象Timer(function, number)中的function参数类型错误！");
    }
    if (typeof time != "number") {
      throw new Error("计时器对象Timer(function, number)中的number参数类型错误！");
    }

    /**
     * 向该计时器队列中新增一次调用
     */
    this.open = function (bool) {
      var openAsync = bool || async;
      if (openAsync) {
        timer = setTimeout(abort, time);
        return true;
      } else {
        asyncArr.push(abort);
      }
      if (asyncArr.length == 1) {
        out();
      }
      return openAsync;
    }
    /**
     * 清空该计时器队列，同时将上一次异步调用取消
     */
    this.close = function () {
      clearTimeout(timer);
      asyncArr = [];
      return true;
    }
  },
  /**
   * 发送XMLHttpRequest请求，不对外开放。
   */
  "sendRequest": function (req) {
    var xhr = MPB.XMLHttpRequest();
    var ajax = MPB.Object.ajax || req;
    xhr.open(ajax.method, ajax.url, ajax.async);
    xhr.setRequestHeader("Content-type", ajax.contentType);
    ajax.beforeSend();
    xhr.send(ajax.data);

    var timer = setTimeout(function () {
      xhr.abort();
    }, ajax.timeout)//设置计时器

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {

        clearTimeout(timer);// 规定时间内完成响应，关闭计时器

        var responseText = xhr.responseText;//返回结果
        var res = JSON.parse(responseText);//回调函数
        if (obj[0].id > 0) {
          ajax.success(res);
        } else {
          ajax.error();
        }
      } else if (error) {
        ajax.error();
      }
    }
    ajax.complete();
  },
  /**
   * ajax请求方法，服务器返回的要是json！
   * 如果req为url，则需要一个success回调函数，如果之前有过ajax请求，则可以重复上一次的请求设置。
   * 如果不想重复上一次ajax请求设置，则只需传入一个json即可。
   * @param {string} method 请求方式，默认GET （可选）。
   * @param {string} url 请求的地址 （必须）。
   * @param {string} data 发送的数据，默认null。
   * @param {boolean} async 是否异步，默认true。
   * @param {function} beforeSend 发送请求前调用函数 （可选）。
   * @param {function} success 成功回调函数 （必须）。
   * @param {function} error 失败回调函数（可选）。
   * @param {string} contentType 发送数据到服务器时所使用的内容类型 （可选）。
   * @param {number} timeout 设置本地的请求超时时间，默认60秒（可选）。
   * @param {function} complete 请求完毕回调函数（可选）。
   */
  "ajax": function (req, success) {
    var ajax = null;
    if (MPB.Object.ajax != null) {
      ajax = MPB.Object.ajax
      if (typeof req == "string" && typeof success == "function") {
        ajax.url = req;
        ajax.success = success;
      }
    }
    if (typeof req == "object") {
      ajax = {
        method: req.method || "get",
        url: req.url || (() => { throw new Error('地址都不给人家！') })(),
        data: req.data || null,
        contentType: req.contentType || "application/x-www-form-urlencoded",
        dataType: req.dataType || "",// 尚未实现.....
        async: req.async || true,
        cache: req.cache || true,
        timeout: req.timeout || 60000,
        beforeSend: req.beforeSend || function () { },
        success: req.success || (() => { throw new Error('给我一个成功回调函数嘛！') })(),
        error: req.error || function () { console.log("服务器返回错误！") },
        complete: req.complete || function () { }
      }
    }
    if (ajax != null) {
      MPB.Object.ajax = ajax;
    } else {
      throw new Error('你传进来的是个啥!?');
    }
    MPB.sendRequest();
  },
  /**
   * 标签懒加载,将需要添加入html的标签分批加载。
   * @param {array} data json对象数组。
   * @param {number} num 你希望每批加载多少。
   */
  "Taglazyload": function (data, callback) {
    var data = data,
      callback = callback;
    /**
     * Taglazyload对象上的方法。
     * @param {number} num 设置每批加载多少。
     */
    this.lazyload = function (num) {
      if (data.length < num && data.length > 0) {
        num = data.length;
      }
      for (var i = num; i-- && data.length > 0;) {
        callback(data.shift());
      }
      return data.length === 0;
    }
    /**
     * 查看当前-标签懒加载-对象的data。
     */
    this.getData = function () {
      return data;
    }
    /**
     * 直接调用一次回调函数。
     */
    this.callback = function () {
      callback();
    }
  },
  /**
   * 加载外部文件
   * 1.输入外部文件的地址，加载完毕回调函数
   */
  "Loadscripts": function (scripts, callback) {
    if (typeof scripts != 'object') var scripts = [scripts];
    var HEAD = document.getElementsByTagName("head").item(0) || document.documentElement;
    var s = [], last = scripts.length - 1;

    var recursiveLoad = function (i) { //递归
      s[i] = document.createElement("script");
      s[i].setAttribute("type", "text/javascript");
      s[i].setAttribute("src", scripts[i]);
      s[i].onload = s[i].onreadystatechange = function () { //Attach handlers for all browsers
        if (this.readyState == "loaded" || this.readyState == "complete") {
          this.onload = this.onreadystatechange = null;
          this.parentNode.removeChild(this);
          if (i != last) {
            recursiveLoad(i + 1);
          } else if (typeof (callback) == "function") {
            callback();
          }
        }
      }
      HEAD.appendChild(s[i]);
    };
    recursiveLoad(0);
  },
}

/**
 * 下面这个字面量存放着一些被我废弃的方法。
 * 舍不得删除，这些都是我思考过的记录。
 */
var MPBbaned = {
  /**
   * 对应MPB中的Timer
   * 采用了一种更明了的对象构建
   */
  "timeOut": function (abort, time) {
    if (typeof abort != "function") {
      console.log("使用计时器对象至少需要一个方法！");
      return undefined;
    }
    var init = {
      abort: abort,
      time: time || 0
    }
    var Timer = function () {
      this.abort = init.abort;
      this.time = init.time;
      this.async = false;
      this.timer = null;
      this.asyncArr = [];
    }
    // 新增一个计时器
    Timer.prototype.open = function (bool) {
      var async = bool || this.async;
      if (async) {
        // async 为true 则直接使用计时器，异步调用
        this.timer = setTimeout(this.abort, this.time);
      } else {
        // async 为false 则将新增的计时器添加到队列中，用来同步执行
        this.asyncArr.push(this.abort);
      }
      // 如果队列里出现了第一个计时器，则开始递归执行out
      if (this.asyncArr.length == 1) {
        this.out();
      }
    }
    Timer.prototype.out = function () {
      //只要队列还有计时器，就继续调用。
      if (this.asyncArr.length > 0) {
        this.timer = setTimeout(() => {
          this.asyncArr.shift()();//先移出队列再调用
          this.out();//递归
        }, this.time);
      }
    }
    Timer.prototype.close = function () {
      clearTimeout(this.timer);
      this.asyncArr = [];
    }
    return new Timer;
  },
  /**
   * 废弃这个ajax请求的原因：我想把输入的req的对象字面量与发送请求解耦
   * 将ajax拆分成了ajax和sendRequset两部分 
   */
  "ajax": function (req) {
    var ajax = {
      method: req.method || "get",
      url: req.url || (() => { throw new Error('地址都不给人家！') })(),
      data: req.data || null,
      contentType: req.contentType || "application/x-www-form-urlencoded",
      dataType: req.dataType || "",
      async: req.async || true,
      cache: req.cache || true,
      timeout: req.timeout || null,
      beforeSend: req.beforeSend || function () { },
      success: req.success || (() => { throw new Error('给我一个成功回调函数嘛！') })(),
      error: req.error || function () { console.log("服务器返回错误！") }
    }
    var xhr = MPB.XMLHttpRequest();
    xhr.open(ajax.method, ajax.url, ajax.async);
    xhr.setRequestHeader("Content-type", ajax.contentType);
    ajax.beforeSend();
    xhr.send(ajax.data);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          var responseText = xhr.responseText;//返回结果
          var obj = JSON.parse(responseText);
          if (obj[0].id > 0) {
            ajax.success(obj);
          } else {
            ajax.error();
          }
        } else if (error) {
          ajax.error();
        }
      }
    }
  }
}
var data = [1, 2, 3, 4, 5, 6, 7, 8];
var p = new MPB.Taglazyload(data, function (val) {
  console.log(val);
})
p.lazyload(2);