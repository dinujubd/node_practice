const { Readable } = require('stream')

const data = [
    "lorem",
    "impsum",
    "some",
    "random",
    "data"
]

class CustomReadStream extends Readable {
    constructor(arr) {
        super({ objectMode: true });
        this.arr = arr;
        this.index = 0;
    }

    _read() {
        if (this.index <= this.arr.length) {
            const chunk = this.arr[this.index]
            this.push({ data: chunk, index: this.index })
            this.index++;
        } else {
            this.push(null)
        }
    }


}

const customStream = new CustomReadStream(data);

customStream.on('data', (chunk) => {
    console.log(chunk)
})

customStream.on('end', () => console.log('end'))