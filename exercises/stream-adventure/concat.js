const concat = require('concat-stream')  

process.stdin
  .pipe(concat((data) => {
      process.stdout.write(data.toString().split('').reverse().join(''))
  }))