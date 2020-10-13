const fs = require('fs');
const beep = () => process.stdout.write("\x07");

const cbHell = () => {
    console.log("starting");

    setTimeout(() => {
        console.log('waiting')
        setTimeout(() => {
            console.log('waiting some more');

            fs.writeFile('cb_file.txt', 'sample file ...', err => {
                if (err) {
                    console.error(err);
                } else {
                    beep();
                    console.log('file created')
                    setTimeout(() => {
                        beep();
                        fs.unlink('cb_file.txt', err => {
                            if (err) {
                                console.error(err);
                            } else {
                                console.log('removed')
                            }
                        })
                    }, 3000);
                }
            })

        }, 2000)
    }, 1000)
}

cbHell()