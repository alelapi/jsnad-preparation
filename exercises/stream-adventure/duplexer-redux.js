const duplexer2 = require("duplexer2")
const through2 = require('through2')

module.exports = function (counter) {
    const countries = {}

    const stream = through2.obj(function (obj, _, next) {
        if (!countries[obj.country]) {
            countries[obj.country] = 0
        }
        countries[obj.country]++
        next();
    }, function(done) {
        counter.setCounts(countries)
        done()
    })

    return duplexer2(stream, counter)
}  