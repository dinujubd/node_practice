const http = require('http');
const server = http.createServer();

server.on('connection', socket => {
    console.log('connected')
})

server.on('request', (req, res) => {
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.write("Some Response\n", 'utf-8');
    setTimeout(() => {
        res.write("Some Another Response\n")
    }, 1000);
})

server.listen(8080)