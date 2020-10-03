const fs = require('fs')
const http = require('http');
const server = http.createServer();

server.on('connection', socket => {
    console.log('connected')
})

server.on('request', (req, res) => {
    const route = req.url;

    switch (route) {
        case '/home':
        case '/about':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(fs.readFileSync(`.${route}.html`));
            break;
        case '/':
            res.writeHead(301, { 'Location': '/home' });
            res.end()
        default: break;
    }

})

server.listen(8080)