const { spawn } = require('child_process')
const { chown } = require('fs')

const child = spawn('find', ['.', '-type', 'f'])

const wc_child = spawn('wc')

process.stdin.pipe(wc_child.stdin)

wc_child.stdout.on('data', data => {
    console.log(`WC: ${data}\n`)
})

child.stdout.on('data', (data) => {
    console.log(`Data: ${data}`)
})

child.stderr.on('data', (err) => {
    console.log(`Error: ${err}`)
})

child.on('exit', (code, signal) => {
    console.log(`child process exited with code: ${code} and signal: ${signal}`)
})