const fs = require('fs')

const printFilteredLs = (dir, ext, cb) => 
    fs.readdir(dir, (err, list) => {
        if (err) {
            return cb(err)
        }
        cb(null, list.filter(file => file.split('.')[1] === ext))
    })

module.exports = printFilteredLs