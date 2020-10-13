const fs = require('fs');
const { promisify } = require('util')

const writeFile = promisify(fs.writeFile)
const unlink = promisify(fs.unlink)

const delay = (seconds) => new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
});


const beep = () => process.stdout.write("\x07");

const promiseChain = () => Promise.resolve()
    .then(() => console.log("starting"))
    .then(() => delay(1))
    .then(() => "waiting")
    .then(console.log)
    .then(() => delay(2))
    .then(() => "waiting some more")
    .then(console.log)
    .then(() => writeFile('promise_file.txt', 'sample file...'))
    .then(beep)
    .then(() => "file created")
    .then(console.log)
    .then(() => delay(3))
    .then(beep)
    .then(() => unlink('promise_file.txt'))
    .then(() => 'removed')
    .then(console.log)
    .catch(console.error)


promiseChain()