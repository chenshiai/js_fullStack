function permutations(str) {
  var regex = /(.)\1+/g;
  var permutate = function (str) {
    var result = [];
    if (str.length == 1) { //边界
      return [str];
    } else {
      var preResult = permutate(str.slice(1));
      // 插空法
      for (var j = 0; j < preResult.length; j++) {
        for (var k = 0; k < preResult[j].length + 1; k++) {
          var temp = preResult[j].slice(0, k) + str[0] + preResult[j].slice(k);
          result.push(temp);
        }
      }
      return result;
    }
  };
  return permutate(str).filter(function (item, index, self) {
    return self.indexOf(item) === index});
}
      console.log(permutations('aabb'));
;