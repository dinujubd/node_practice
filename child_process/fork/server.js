const { fork } = require('child_process');

require('http')
    .createServer((req, res) => {

        if (req.url === '/compute') {
            const compute = fork('./compute.js')
            compute.send('start')
            compute.on('message', msg => {
                res.end('' + msg)
            })

        } else {
            res.end('Ok')
        }
    }).listen(8080);
