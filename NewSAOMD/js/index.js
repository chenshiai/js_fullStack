function IndexInit() {
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

  $('#startFind').click(function () {
    loadIngOfMask();
    setTimeout(loadOverOfMask, 2000);
  })

  var swiper = new Swiper('.swiper-container', {
    slidesPerView: 3,
    spaceBetween: 10,
    centeredSlides: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  var newRoles = BasicConfig.newRoles;
  let i = 0;
  $('.swiper-slide').find('img').each(function () {
    $(this).attr('src', newRoles[i].src);
    i++;
  })
  console.log('初始化完成')
}
function loadOverOfMask() {
  $('.mask').css('height', '0px');
  $('.lds-message').css('display', 'none');
}
function loadIngOfMask() {
  $('.mask').css('height', '100%');
  $('.lds-message').css('display', 'block');
}

