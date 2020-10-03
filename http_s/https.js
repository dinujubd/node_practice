const fs = require('fs')
const http = require('https');

const server = http.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
});

server.on('connection', socket => {
    console.log('connected')
})

server.on('request', (req, res) => {
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.end("Some Response\n", 'utf-8');
})

server.listen(443)