const fs = require('fs');
const { promisify } = require('util')

const writeFile = promisify(fs.writeFile)
const unlink = promisify(fs.unlink)

const delay = (seconds) => new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
});


const beep = () => process.stdout.write("\x07");

const asyncAwait = async () => {
    console.log("starting");
    await delay(1)
    console.log('waiting')
    await delay(2)
    console.log("waiting some more")
    await writeFile('async_file.txt', 'sample file...')
    beep();
    console.log("file created")
    await delay(3);
    beep();
    unlink('async_file.txt')
    console.log("removed")
}

asyncAwait()