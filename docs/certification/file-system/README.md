# File System

STDIN (Standard In) = Input stream used by a program to read input from command shell or Terminal.
STDOUT (Standard Out) = Output stream used by a program to write output.
STDERR (Standard Error) = Separated stream to STDOUT reserved to output errors.

```
process.stdin.on("data", (data) => { //listen for user input
  const name = data.toString().trim().toUpperCase(); //process data
  if (name !== "") {
    process.stdout.write(`Hello ${name}!`); //write output
  } else {
    process.stderr.write("Input was empty."); //write error
  }
});
```

`process` is an object containing all Node.js process information.
`process.stdin.on("data", (data) => {` will listen for a chunk of data. Every chunk is separated with a new line. `(data)` is a Buffer object.
`data.toString()` convert Buffer to string.

## Managing files with fs module

`fs` is a core module that provides API to interact with the file system.

```
const fs = require("fs");
const path = require("path");

const filepath = path.join(process.cwd(), "hello.txt");

const contents = fs.readFileSync(filepath, "utf8");
console.log("File Contents:", contents);

const upperContents = contents.toUpperCase();

fs.writeFileSync(filepath, upperContents);
console.log("File updated.");
```

`process.cwd()` current directory of Node.JS process.
`fs.readFileSync(filepath, "utf8")` utf8 is the encoding parameter. It is optional, if we don't pass it will return a Buffer object.

Both `fs.readFileSync` and `fs.writeFileSync` are synchronous, that means they will block/delay concurrent operations until the read/write is not completed. In Node.js you should try to avoid such synchronous operations.

## Working with files asynchronously

```
const fs = require("fs");
const path = require("path");

const filepath = path.join(process.cwd(), "hello.txt");

fs.readFile(filepath, "utf8", (err, contents) => { // callback
  if (err) {
    return console.log(err);
  }
  console.log("File Contents:", contents);
  const upperContents = contents.toUpperCase();

  fs.writeFileSync(filepath, upperContents);
  console.log("File updated.");
});
```

This code will be executed asynchronously. If you had a setInterval at the end, you will see that the setInterval will continue to be executed even while it's reading the file.

## Using the fs Promises API
