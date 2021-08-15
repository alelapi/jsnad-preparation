const printFilteredLs = require('./mymodule')
const [,,dir,ext] = process.argv
printFilteredLs(dir, ext, (err, list) => {
    if (err) {
        return console.log(err)
    }
    list.forEach(file => {
        console.log(file)
    })
})