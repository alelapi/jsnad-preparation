const http = require('http')
const async = require('async')

const [,,...urls] = process.argv
const results = []
async.forEachOf(urls, (url, key, callback) => {
    http.get(url, (res) => {
        let data = ''
        res.setEncoding('utf8')
        res.on('data', (chunk) => { data += chunk; })
        res.on('end', () => {
            results[key] = data
            callback()
        })
        res.on('error', callback)
    })
}, 
function(err) {
    if (err) return console.error(err)
    results.forEach(res => console.log(res))
});