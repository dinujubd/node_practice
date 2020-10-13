const { createReadStream, createWriteStream } = require('fs')

const readStream = createReadStream('./song.mp3')
const writeStream = createWriteStream('./copy_song.mp3', {
    highWaterMark: 1
})

readStream.on('data', (chunk) => {
    const result = writeStream.write(chunk)

    if (!result) {
        console.log("backpressure on");
        readStream.pause();
    }
})

readStream.on('err', (err) => console.error(err))

readStream.on('end', () => writeStream.end())

writeStream.on('drain', () => {
    console.log('drained')
    readStream.resume();
});

writeStream.on('close', () => console.log('file copied'))