# 清除浮动的几种方法
1. 在父元素底部加上 <div style="clear:both"></div>
2. 在父元素的CSS中加上 float:left;
3. 在父元素上做一个伪类after,并设置以下内容
content:"";
clear:both;
display:block;
height:0;
visibility:hidden;
4. 利用BFC（简称格式化上下文）的效果来弥补父容器的高度塌陷
在父元素的CSS中加上overflow:hidden|auto|scroll;

5. 尼古拉斯大师 方法
把父元素的display设置为table，可以创建一个匿名表格单元。该单元可以直接触发BFC效果