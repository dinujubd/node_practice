process.stdout.write('\u001B[2J\u001B[0;0f')

const server = require('net').createServer();

let count = 0;
let sockets = {};

server.on('connection', socket => {

    socket.id = count++;

    sockets[socket.id] = socket;

    console.log(`${socket.id}client connected`);

    socket.write("hello client");

    socket.on('data', (data) => {
        Object.entries(sockets).forEach(([key, cs]) => {
            if (key == socket.id) return;
            cs.write("From Socket:" + socket.id)
            cs.write(data)
        });
    })

    socket.on('end', () => {
        delete sockets[socket.id]
        console.log('socket ended')
    })

    socket.setEncoding('utf-8')


})



server.listen(8000, () => console.log('server bound'))