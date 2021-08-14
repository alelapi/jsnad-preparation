const crypto = require('crypto')
const [,,passphrase,initValue] = process.argv
const stream = crypto.createDecipheriv('aes256', passphrase, initValue)
process.stdin.pipe(stream).pipe(process.stdout)