const server = require('dgram').createSocket('udp4')

server.on('listening', () => console.log('From UDP'))

server.on('message', (msg, rinfo) => {

    console.log(`${rinfo.address}:${rinfo.port} - ${msg}`)
})

server.bind(8080, '127.0.0.1')
const client = require('dgram').createSocket('udp4');
const msg = Buffer.from('Message sent')

setInterval(() => {
    client.send(msg, 8080, '127.0.0.1', err => {
        console.log('Message Sending Complete')
    })

}, 1000)