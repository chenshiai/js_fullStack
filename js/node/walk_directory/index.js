const fs = require('fs');
const files = [];

function walk(path) {
  fs.readdirSync(path).forEach(file => {
    const newPath = path + '/' + file;
    const stat = fs.statSync(newPath)
    if(stat.isFile()){
      // console.log(file.split('.').pop());
      if(/\.js$/.test(file)){
        files.push(file);
      }
    } else if(stat.isDirectory()){
      walk(newPath);
    }
  });
  // fs.readdir(path, function (error, files) {
  //   if (error) {
  //     console.log(error);
  //     return;
  //   } else {
  //     console.log(files);
  //   }
  // });
}
walk('./src');
console.log(files);
