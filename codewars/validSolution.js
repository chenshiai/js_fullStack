function validSolution(board) {
  var l = [], c = [];
  for (let j = 0; j < board[0].length; j++) {
    l = board[j];
    c = [];
    l = l.filter(x => l.indexOf(x) == l.lastIndexOf(x));
    for (let i = 0; i < board[0].length; i++) {
      c.push(board[i][j]);
    }
    c = c.filter(x => c.indexOf(x) == c.lastIndexOf(x));
    if (l.length < board[0].length || c.length < board[0].length || c.toString() == l.toString()) return false;
  }
  return true;
}
console.log(validSolution(
[[1, 2, 3, 4, 5, 6, 7, 8, 9],
[2, 3, 1, 5, 6, 4, 8, 9, 7],
[3, 1, 2, 6, 4, 5, 9, 7, 8],
[4, 5, 6, 7, 8, 9, 1, 2, 3],
[5, 6, 4, 8, 9, 7, 2, 3, 1],
[6, 4, 5, 9, 7, 8, 3, 1, 2],
[7, 8, 9, 1, 2, 3, 4, 5, 6],
[8, 9, 7, 2, 3, 1, 5, 6, 4],
[9, 7, 8, 3, 1, 2, 6, 4, 5]]))
