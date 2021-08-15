const { Writable } = require('stream')

const myWritable = new Writable({
    write(chunk, _, callback) {
        console.log('writing: ' + chunk)
        callback()
    }
})

process.stdin.pipe(myWritable)