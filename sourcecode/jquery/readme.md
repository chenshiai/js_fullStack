页面加载时 优先显示 DOM树
快点看到页面，将页面分成几件事
html + css 形成静态页面
将外部js库放在后面，100+kb，要下载要执行要花时间(几十毫秒，几秒)
监听事件 document.DOMContentLoaded 是js最佳也是最快执行的地方
比 window.load 要先执行
图片资源，js资源，ajax请求资源等 通过网络依次到达浏览器
不应该影响网页DOM ready