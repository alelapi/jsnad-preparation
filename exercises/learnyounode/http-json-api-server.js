const http = require('http')
const url = require('url')

const server = http.createServer(function (req, res) {
    const requestUrl = url.parse(req.url, true)
    if (req.method == "GET" && requestUrl.pathname == '/api/parsetime') {
        const { iso } = requestUrl.query
        const date = new Date(iso)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify({ 
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds()
        }));
        res.end();
    }
    else if (req.method == "GET" && requestUrl.pathname == '/api/unixtime') {
        const { iso } = requestUrl.query
        const date = new Date(iso)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ 
            unixtime: date.getTime()
        }));
    } else {
        res.writeHead(404)
        res.end('Cannot serve url: ' + path)
    }
})
server.listen(process.argv[2])