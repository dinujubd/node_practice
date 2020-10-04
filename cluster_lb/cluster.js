const cluster = require('cluster')
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
} else {
    require('./server')
}