const { Readable } = require('stream')

const inStream = new Readable({
    read(size) {
        setTimeout(() => {
            if (this.currentCharacterCode > 90) {
                this.push(null)
                return
            }
            this.push(String.fromCharCode(this.currentCharacterCode++))
        }, 100)

    }

});

inStream.currentCharacterCode = 65;

inStream.pipe(process.stdout)