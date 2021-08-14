const trumpet = require('trumpet')
const through = require('through2')
const tr = trumpet()

const stream = tr.select('.loud').createStream()
stream.pipe(through(function (buf, _, next) {
    this.push(buf.toString().toUpperCase())
    next()
})).pipe(stream)
process.stdin.pipe(tr).pipe(process.stdout)
