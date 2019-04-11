function incrementString(strng) {
  // var len = strng.replace(/[^0-9]/g, '');
  // var num = String(Number(strng.replace(/[^0-9]/g, '')) + 1);

  // len = len.length == 0 || len.length < num.length ?
  //   len.length :
  //   num.length

  // return strng.substring(0, strng.length - len) + num
  return strng.replace(/([0-8]?)(9*)$/, function(s, d,ns,c) {
    console.log(s,d,ns,c);
    return +d + 1 + ns.replace(/9/g, '0');
    // 第一个参数：匹配模式的字符串
    // 第二个参数：与模式中的子表达式匹配的字符串
    // 第三个参数：是一个整数
    // 第四个参数：原字符串替换位置
    // ^匹配开头 $匹配结尾
  });
}
console.log(incrementString('foobar009'));