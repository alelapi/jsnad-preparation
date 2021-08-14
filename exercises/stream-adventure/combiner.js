const combine = require('stream-combiner')
const split = require('split2')
const through = require('through2')
const { createGzip } = require('zlib');

module.exports = function () {
    let current;
    const transform = function (obj, _, next) {
        if (obj) {
            if (obj.type === 'genre') {
                current && this.push(JSON.stringify(current) + '\n')
                current = { name: obj.name, books: [] }
            } else {
                current.books.push(obj.name)
            }
        }
        next();
    }

    const flush = function(done) {
        current && this.push(JSON.stringify(current) + '\n')
        done()
    }

    const groupBooks = through.obj(transform, flush)

    return combine(
        // read newline-separated json,
        split(JSON.parse),
        // group books into genres,
        groupBooks,
        // then gzip the output
        createGzip()
    )
}  