const split2 = require('split2')
const through2 = require('through2')
let i = 0;
process.stdin
  .pipe(split2())  
  .pipe(through2(function (line, _, next) {
      const str = line.toString();
      (i % 2 !== 0) ? 
        console.log(str.toUpperCase()) :
        console.log(str.toLowerCase())
      i++;
      next();
  }))
  .pipe(process.stdout)