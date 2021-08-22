const http = require('http');
const { Readable } = require('stream');

const moons = ['🌕','🌖','🌗','🌘','🌑','🌒','🌓','🌔'];

const streamer = (stream) => {
    let i = 0;
  
    return setInterval(() => {
        // clear the screen
        stream.push('\033[2J\033[3J\033[H');
        stream.push(moons[i % moons.length]);
        i += 1;
    }, 70);
};
 
const server = http.createServer((req, res) => {
    if (req.url === '/healthcheck') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({status: 'ok'}));
    }
  
    if (
        req.headers &&
        req.headers['user-agent'] &&
        !req.headers['user-agent'].includes('curl')
    ) {
        res.writeHead(500, "use a curl request");
        return res.end();
    }
  
    const stream = new Readable();
    stream._read = function noop() {};
    stream.pipe(res);
    const interval = streamer(stream);
  
    req.on('close', () => {
        stream.destroy();
        clearInterval(interval);
    });
});
  
const port = 3000;
server.listen(port, err => {
    if (err) throw err;
    console.log(`Listening on localhost:${port}`);
});