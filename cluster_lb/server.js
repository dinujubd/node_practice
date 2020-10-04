const http = require('http');
const pid = process.pid;

http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });

    for (let i = 0; i < 1e7; i++);
    response.end(`handled by process ${pid}`)

}).listen(8081);


process.on('message', msg => {
    console.log(msg)
})