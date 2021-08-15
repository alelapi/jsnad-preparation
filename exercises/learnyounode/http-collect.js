const http = require('http')
http.get(process.argv[2], (res) => {
    let data = ''
    res.setEncoding('utf8')
    res.on('data', (chunk) => { data += chunk; })
    res.on('end', () => {
        try {
            console.log(data.length)
            console.log(data);
        } catch (e) {
            console.error(e.message)
        }
    })
    res.on('error', console.error)
})