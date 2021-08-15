const { Readable } = require('stream')
const [,,content] = process.argv
       
const myStream = new Readable({})  
myStream._read = () => {}
myStream.push(content)

myStream.pipe(process.stdout)