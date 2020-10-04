const cluster = require('cluster');
const { ClientRequest } = require('http');
const os = require('os')

if (cluster.isMaster) {
    const cpus = os.cpus().length;
    console.log(`forking ${cpus} cp`)
    for (let i = 0; i < cpus; i++) {
        cluster.fork();
    }

    Object.values(cluster.workers).forEach(w => {
        w.send(`Hi, worker ${w.id}`)
    })

    cluster.on('exit', (w, c, s) => {
        if (code !== 0 && !w.exitedAfterDisconnect) {
            cluster.fork()
        }
    })
} else {
    require('./server')
}