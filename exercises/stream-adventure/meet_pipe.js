const fs = require('fs')
const [,,file] = process.argv
fs.createReadStream(file).pipe(process.stdout)
