const [,,...numbers] = process.argv
console.log(numbers.reduce((sum,n) => sum + (+n), 0))