const crypto = require('crypto')
const fs = require('fs')
const zlib = require('zlib')
const file = process.argv[2];

const { Transform } = require('stream');
const { SSL_OP_NO_TLSv1_1 } = require('constants');

const progress = new Transform({
    transform(chunk, encoding, callback) {
        process.stdout.write('.');
        callback(null, chunk);
    }
})

fs.createReadStream(file)
    .pipe(zlib.createGzip())
    .pipe(crypto.createCipher('aes-128-gcm', 'a_secret'))
    .pipe(progress)
    .pipe(fs.createWriteStream(file + '.gz'))
    .on('finish', () => console.log('done'))