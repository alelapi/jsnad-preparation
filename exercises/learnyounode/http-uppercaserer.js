const http = require('http')
const { Transform } = require('stream')
const uppercase = new Transform({
    transform(chunk, _, callback) {
        callback(null, chunk.toString().toUpperCase());
    }
})
const server = http.createServer(function (req, res) {
    if (req.method == "POST") {
        req.pipe(uppercase).pipe(res)
    }
})
server.listen(process.argv[2])