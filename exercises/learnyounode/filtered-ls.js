const fs = require('fs')
const [,,dir,ext] = process.argv
fs.readdir(dir, (err, list) => {
    if (err) {
        return console.log(err)
    }
    list.forEach(file => {
        if(file.split('.')[1] === ext)
            console.log(file)
    })
})