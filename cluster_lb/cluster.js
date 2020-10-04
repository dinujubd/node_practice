const cluster = require('cluster');
const { resolve } = require('dns');
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

    process.on('SIGUSR2', () => {
        const workers = Object.values(cluster.workers);

        const resstartWorker = (index) => {
            const worker = workers[index]

            if (!worker) return;

            worker.on('exit', (c, s) => {
                if (!worker.exitedAfterDisconnect) return;

                console.log(`exited process`)

                cluster.fork().on('listening', () => {
                    resstartWorker(index + 1)
                })

            });

            worker.disconnect();

        }

        resstartWorker(0)
    })

} else {
    require('./server')
}