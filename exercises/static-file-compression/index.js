const http = require('http');
const accepts = require('accepts')
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
 
const server = http.createServer((req, res) => {
    if (req.url === '/healthcheck') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({status: 'ok'}));
    }

    const readStream = fs.createReadStream(path.join(__dirname, 'static', req.url));
    readStream.on('error', function(err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
    });

    const zip = {
        deflate: zlib.createDeflate(),
        br: zlib.createBrotliCompress(),
        gzip: zlib.createGzip()
    }

    
    const accept = accepts(req);
    console.log(accept.encodings())
    const compression = accept.encoding(['deflate', 'br', 'gzip']);
    if (!compression) {
        res.writeHead(500, "unsupported compression");
        res.end();
        return;
    }
    console.log({compression})
    readStream.pipe(zip[compression])
        .pipe(res)
        .on('finish', () => {
            res.writeHead(200);
            res.end();
        })
        .on('error', (err) => {
            res.writeHead(500, err);
            res.end();
        });
});
  
const port = 3000;
server.listen(port, err => {
    if (err) throw err;
    console.log(`Listening on localhost:${port}`);
});