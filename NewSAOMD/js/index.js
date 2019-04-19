var saomdIndex = {
  /**
   * 滚动条到一定距离，元素与顶端固定距离方法，单个元素有效
   * @param {string} node  需要绑定的目标节点的class或id
   * @param {number} scrollTop  滚动多少触发
   * @param {number} where  固定在距离顶端什么位置
   */
  "scrollFixed": function (node, scrollTop, where) {
    if (typeof node == 'string') {
      if (typeof scrollTop == 'number') {
        if (typeof where == 'number') {
          window.addEventListener('scroll', function () {
            var theNode = document.querySelector(node);
            if (saomdIndex.getScrollTop() >= scrollTop) {
              theNode.style.position = 'fixed';
              theNode.style.top = where + 'px';
            } else {
              theNode.style.position = 'inherit';
            }
          });
          return;
        }
      }
    }
    throw new Error("Index 的方法 scrollFixed(node, scrollTop, where) 参数类型错误！");
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
 * 用于index.html的初始化方法
 */
function IndexInit() {
  // 事件代理，点击切换内容
  var selectlListItem = $(".select-list__item");
  for (item of selectlListItem) {
    item.onclick = function (ev) {
      var ev = ev || window.event;
      var target = ev.target || ev.srcElement;
      var childSpan = this.children[0];
      childSpan.innerHTML = target.innerHTML;
    }
  }

  $('#clearSelect').click(function () {
    var itemTitle = $('.item-title');
    var selectInit = ['选择属性', '选择武器', '选择性别', '选择星级', '选择角色'];
    for (let i = 0; i < 5; i++) {
      itemTitle[i].innerHTML = selectInit[i];
    }
  });

  // 点击检索事件
  $('#startFind').click(function () {
    Mask.loadingMask('rgba(0,0,0,0.3)');
    setTimeout(function(){
      Mask.loadoverMask('rgba(0,0,0,0.3)');
    },2000)
  })

  // swiper 框架使用
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

  // 初始配置数据添加
  var newRoles = BasicConfig.newRoles;
  let i = 0;
  $('.swiper-slide').find('img').each(function () {
    $(this).attr('src', newRoles[i].src);
    i++;
  });
  $('.Notice-text__greet').find('.greet-content')[0].innerHTML = BasicConfig.Notice.greet;
  $('.Notice-text__greet').find('.greet-time')[0].innerHTML = BasicConfig.Notice.greetTime;

  // 搜索栏固定
  saomdIndex.scrollFixed('.section-select', 400, 100);

  console.log('初始化完成')
}

