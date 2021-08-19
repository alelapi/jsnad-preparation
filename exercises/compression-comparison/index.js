const zlib = require('zlib')
const fs = require('fs')
const path = require('path')

const getFileSize = (file) => new Promise((resolve, reject) => {
    fs.stat(file, (err, stats) => {
        if (err) {
            return reject(err)
        }
        console.log('Original file size:', stats.size)
        resolve(stats.size)
    })
})

const clean = () => new Promise((resolve, reject) => {
    fs.readdir('zip', (err, files) => {
        if (err) return reject(err);
    
        for (const file of files) {
            fs.unlinkSync(path.join('zip', file));
        }
        resolve();
    });
})

const readStream = fs.createReadStream(process.argv[2]);
const task = (zip, filename) => new Promise((resolve, reject) => {
    readStream.pipe(zip)
                .pipe(fs.createWriteStream(filename))
                .on('finish', resolve)
                .on('error', reject);
});

const printStats = (size) => new Promise((resolve, reject) => {
    fs.readdir('zip', (err, files) => {
        if (err) {
            return reject(err)
        }
        files.forEach(file => {
            fs.stat(path.join('zip', file), (err, stats) => {
                if (err) {
                    return reject(err)
                }
                console.log(file + ' - Size: ' + stats.size + ', Compression: ' + (100 - (stats.size/size) * 100).toFixed(2) + '%')
            })
        })
        resolve()
    })
})

let originalFileSize;
clean()
    .then(() => getFileSize(process.argv[2]))
    .then((size) => {
        originalFileSize = size;
        return Promise.all([
            task(zlib.createBrotliCompress(), path.join('zip', 'brotli.zip')),
            task(zlib.createDeflate(), path.join('zip', 'deflate.zip')),
            task(zlib.createGzip(), path.join('zip', 'gzip.zip'))
        ])
    })
    .then(() => printStats(originalFileSize))
