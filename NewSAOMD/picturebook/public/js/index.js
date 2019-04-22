var SaomdIndex = {
  /**
   * 滚动条到一定距离，元素调用方法
   * @param {string} node  需要绑定的目标节点的class或id
   * @param {number} scrollTop  滚动多少距离触发
   * @param {function} callback  回调函数
   */
  "scroll": function (node, callback = null, scrollTop) {
    if (typeof node == 'string') {
      if (typeof scrollTop == 'number') {
        window.addEventListener('scroll', function () {
          var theNode = document.querySelector(node);
          if (Scroll.getScrollTop() >= scrollTop && callback) {
            callback(theNode, true);
          } else {
            callback(theNode, false);
          }
        });
        return;
      }
    }
    throw new Error("Index 的方法 scrollFixed(node, scrollTop, where) 参数类型错误！");
  },
  /**
   * ajax请求方法
   * @param {string} Method get还是post还是其他 
   * @param {string} url 请求的地址 
   * @param {string} data 发送的数据
   * @param {boolean} Aysnc 是否同步
   * @param {function} callback 成功回调函数
   * @param {function} errorback 失败回调函数
   */
  "ajaxRequest": function (Method, url, data, Aysnc, callback = null, errorback = null) {
    var xhr = null;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (!callback) {
      console.log('不要回调函数是不行的哦!');
      return;
    }
    xhr.open(Method, url, Aysnc);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(data);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          var responseText = xhr.responseText;//返回结果
          var obj = JSON.parse(responseText);
          if (obj[0].id > 0) {
            callback(obj);
          } else {
            errorback();
          }
        } else if (errorback) {
          errorback();
        }
      }
    }
  },
  /**
   * 标签懒加载,将需要添加入html的标签分批加载
   * @param {array} data json对象数组
   * @param {number} num 你希望每批加载多少
   * @param {function} callback 数据加载方法
   */
  "tagLazyload": class {
    constructor(data) {
      this.data = data;
    }
    lazyload(num, callback) {
      if (this.data.length < num && this.data.length > 0) {
        num = this.data.length;
      }
      for (var i = num; i-- && this.data.length > 0;) {
        callback(this.data.shift());
      }
      return this.data.length == 0;
    }
  },
  /** 
   * 串联加载指定的脚本
   * 串联加载[异步]逐个加载，每个加载完成后加载下一个
   * 全部加载完成后执行回调
   * @param {array} scripts string 指定的脚本们
   * @param {function} callback 成功后回调的函数
   */
  "seriesLoadScripts": function (scripts, callback) {
    if (typeof (scripts) != "object") var scripts = [scripts];
    var HEAD = document.getElementsByTagName("head").item(0) || document.documentElement;
    var s = new Array(), last = scripts.length - 1;
    var recursiveLoad = function (i) { //递归
      s[i] = document.createElement("script");
      s[i].setAttribute("type", "text/javascript");
      s[i].onload = s[i].onreadystatechange = function () { //Attach handlers for all browsers
        if (!/*@cc_on!@*/0 || this.readyState == "loaded" || this.readyState == "complete") {
          this.onload = this.onreadystatechange = null;
          this.parentNode.removeChild(this);
          if (i != last){
            recursiveLoad(i + 1);
          } else if (typeof (callback) == "function"){
            callback();
          }
        }
      }
      s[i].setAttribute("src", scripts[i]);
      HEAD.appendChild(s[i]);
    };
    recursiveLoad(0);
  },
  /**
   * 并联加载指定的脚本
   * 并联加载[同步]同时加载，不管上个是否加载完成，直接加载全部
   * 全部加载完成后执行回调
   * @param {array} scripts string 指定的脚本们
   * @param {function} callback 成功后回调的函数
   */
  "parallelLoadScripts": function (scripts, callback) {
    if (typeof (scripts) != "object") var scripts = [scripts];
    var HEAD = document.getElementsByTagName("head").item(0) || document.documentElement, s = new Array(), loaded = 0;
    for (var i = 0; i < scripts.length; i++) {
      s[i] = document.createElement("script");
      s[i].setAttribute("type", "text/javascript");
      s[i].onload = s[i].onreadystatechange = function () { //Attach handlers for all browsers
        if (!/*@cc_on!@*/0 || this.readyState == "loaded" || this.readyState == "complete") {
          loaded++;
          this.onload = this.onreadystatechange = null;
          this.parentNode.removeChild(this);
          if (loaded == scripts.length && typeof (callback) == "function") callback();
        }
      };
      s[i].setAttribute("src", scripts[i]);
      HEAD.appendChild(s[i]);
    }
  }
}

var Scroll = {
  "ToTop": function () {
    var currentScroll = Scroll.getScrollTop();
    if (currentScroll > 0) {
      window.requestAnimationFrame(Scroll.ToTop);
      window.scrollTo(0, currentScroll - (currentScroll / 10));
    }
  },
  "getClientHeight": function () {
    //取窗口可视范围的高度
    var clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
      var clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    } else {
      var clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    }
    return clientHeight;
  },
  "getScrollTop": function () {
    //取窗口滚动条高度
    var scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
      scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
      scrollTop = document.body.scrollTop;
    }
    return scrollTop;
  },
  "getScrollHeight": function () {
    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    if (document.body) {
      bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
      documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
  },
  "getWindowHeight": function () {
    var windowHeight = 0;
    if (document.compatMode == "CSS1Compat") {
      windowHeight = document.documentElement.clientHeight;
    } else {
      windowHeight = document.body.clientHeight;
    }
    return windowHeight;
  }
}

var Mask = {
  // 操作页面上的mask
  "loadoverMask": function (color) {
    if (document.querySelector('.masks')) {
      var theMask = document.getElementById('masks');
      theMask.style.backgroundColor = color;
      theMask.style.height = '0px';
    } else {
      console.log('在页面上没有找到mask组件！')
    }
  },
  "loadingMask": function (color) {
    if (document.querySelector('.masks')) {
      var theMask = document.getElementById('masks');
      theMask.style.backgroundColor = color;
      theMask.style.height = '100%';
    } else {
      console.log('在页面上没有找到mask组件！')
    }
  }
}

/**
 * 用于index.html的方法
 */
function IndexInit() {
  var userfind = {
    element: '',
    weapon: '',
    sex: '',
    rare: '',
    role: ''
  }
  // 事件代理，点击切换内容
  var selectlListItem = $(".select-list__item");
  for (item of selectlListItem) {
    item.onclick = function (ev) {
      var ev = ev || window.event;
      var target = ev.target || ev.srcElement;
      var childSpan = this.children[0];
      childSpan.innerHTML = target.innerHTML;
      childSpan.setAttribute('val', target.getAttribute('val'));
    }
  }

  $('#clearSelect').click(function () {
    var itemTitle = $('.item-title');
    var selectInit = ['选择属性', '选择武器', '选择性别', '选择星级', '选择角色'];
    for (let i = 0; i < 5; i++) {
      itemTitle[i].innerHTML = selectInit[i];
      itemTitle[i].setAttribute('val', '');
    }
  });


  // 点击检索事件
  $('#startFind').click(function () {
    userfind.element = selectlListItem[0].children[0].getAttribute('val');
    userfind.weapon = selectlListItem[1].children[0].getAttribute('val');
    userfind.sex = selectlListItem[2].children[0].getAttribute('val');
    userfind.rare = selectlListItem[3].children[0].getAttribute('val');
    userfind.role = selectlListItem[4].children[0].getAttribute('val');
    var data = `element=${userfind.element}&weapon=${userfind.weapon}&sex=${userfind.sex}&rare=${userfind.rare}&role=${userfind.role}`;
    Mask.loadingMask('rgba(0,0,0,0.3)');
    document.querySelector('.rolecard-list').innerHTML = '';
    SaomdIndex.ajaxRequest('post', '/userfind', data, true, roleCardDate, requestError);
  })

  // 回调函数
  function roleCardDate(response) {
    var loadmore = document.getElementsByClassName("loadmore");
    var lazyload = new SaomdIndex.tagLazyload(response);
    loadmore[0].style.display = "block";
    loadmore[0].onclick = null;
    lazyload.lazyload(10, inputRoleCard);
    loadmore[0].onclick = function () {
      if (lazyload.lazyload(10, inputRoleCard)) {
        loadmore[0].innerHTML("没有更多了！");
        loadmore[0].onclick = null;
      }
    }
    setTimeout(function () {
      Mask.loadoverMask('rgba(0,0,0,0.3)');
    }, 500);
  }
  function requestError() {
    alert("哎呀，出错啦！找负责人反馈一下吧~~~");
    setTimeout(function () {
      Mask.loadoverMask('rgba(0,0,0,0.3)');
    }, 500);
  }
  // 数据写入
  function inputRoleCard(data) {
    var roleCard = document.querySelector('#rolecard').cloneNode(true);
    roleCard.style.display = 'flex';
    roleCard.id = 'newcard';
    roleCard.querySelector('.item-cutin').innerHTML =
      `<img src="./images/cutin/${data.cutin}.gif" alt="" />`;
    for (let i = data.rare + 3; i--;) {
      var roleRare = document.createElement('img');
      roleRare.src = './images/icon/icon_rarity_1.png';
      roleCard.querySelector('.item-detail__rarity').append(roleRare);
    }
    if (data.up == "1") {
      var roleRare1 = document.createElement('img');
      roleRare1.src = './images/icon/icon_rarity_2.png';
      roleCard.querySelector('.item-detail__rarity').append(roleRare1);
    }
    roleCard.querySelector('.item-detail__title').innerHTML = data.title;
    roleCard.querySelector('.item-detail__name').innerHTML = data.name;
    // 属性，武器未写
    roleCard.querySelector('.item-ele').innerHTML = `<img src='./images/icon/Element/icon_ele_${data.element}.png'>`;
    roleCard.querySelector('.item-wea').innerHTML = `<img src='./images/icon/weapon/icon_job_${data.weapon}.png'>`;
    roleCard.querySelector('.hpA').innerHTML = `HP:${data.HP}`;
    roleCard.querySelector('.mpA').innerHTML = `MP:${data.MP}`;
    roleCard.querySelector('.atkA').innerHTML = `ATK:${data.ATK}`;
    roleCard.querySelector('.defA').innerHTML = `DEF:${data.DEF}`;
    roleCard.querySelector('.criA').innerHTML = `CRI:${data.CRI}`;

    var a = document.createElement('a');
    a.href = "/roles/" + data.id;
    a.append(roleCard);
    document.querySelector('.rolecard-list').append(a);
  }
  // 请求 swiper 框架使用
  SaomdIndex.seriesLoadScripts("https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.0.2/js/swiper.min.js", function () {
    var swiper = new Swiper('.swiper-container', {
      slidesPerView: 3,
      spaceBetween: 10,
      centeredSlides: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    var newRoles = BasicConfig.newRoles;
    let i = 0;
    $('.swiper-slide').find('img').each(function () {
      $(this).attr('src', newRoles[i].src);
      i++;
    });
    $('.Notice-text__greet').find('.greet-content')[0].innerHTML = BasicConfig.Notice.greet;
    $('.Notice-text__greet').find('.greet-time')[0].innerHTML = BasicConfig.Notice.greetTime;
  })

  // 搜索栏固定
  SaomdIndex.scroll('.section-select', function (theNode, toggle) {
    if (toggle) {
      theNode.style.position = 'fixed';
      theNode.style.top = 90 + 'px';
    } else {
      theNode.style.position = 'relative';
      theNode.style.top = '0px';
    }
  }, 400);

  SaomdIndex.scroll('.goTop', function (theNode, toggle) {
    if (toggle) {
      theNode.style.display = 'block';
    } else {
      theNode.style.display = 'none';
    }
  }, 600);

  // 回滚顶部
  $('.goTop').click(Scroll.ToTop);

  $('.sss').click(function () {
    SaomdIndex.ajaxRequest('get', '/roles/12', {}, true, function (res) {
      console.log(res);
    });
  })
  console.log('初始化完成')
}

