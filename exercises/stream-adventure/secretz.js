const tar = require('tar')
const crypto = require('crypto')
const { Writable } = require('stream')
const [,,alg,key,iv] = process.argv

const decrypt = crypto.createDecipheriv(alg, key, iv)

const parser = new tar.Parse()
parser.on('entry', function (entry) {
    if (entry.type === 'File') {
        const hexEncode = crypto.createHash('md5', { encoding: 'hex' })
        entry.pipe(hexEncode).pipe(new Writable ({
            write(chunk, _, callback) {
                console.log(chunk + ' ' + entry.path)
                callback()
            }
        }))
    } else {
        entry.resume()
    }
});

process.stdin
    .pipe(decrypt)
    .pipe(parser)