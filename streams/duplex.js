const { Duplex } = require('stream')

const outStream = new Duplex({
    write(chunk, encoding, callback) {
        console.log(chunk.toString());
        callback();
    },

    read(size) {
        setTimeout(() => {
            if (this.currentCharacterCode > 90) {
                this.push(null)
                return
            }
            this.push(String.fromCharCode(this.currentCharacterCode++))
        }, 100)

    }

})

process.stdin.pipe(outStream)