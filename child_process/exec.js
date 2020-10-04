const { exec } = require('child_process')

exec('find . -type f | wc -l', (err, stdout, stderr) => {
    if (err) {
        console.err(`exec err`)
        return
    }

    console.log(`No of files: ${stdout}`)
})