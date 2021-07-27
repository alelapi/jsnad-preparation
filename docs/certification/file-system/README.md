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

fs Promises API = a subset of fs functions that return a Promise instance of use callbacks.

```
const fs = require("fs").promises; // use fs Promise API
const path = require("path");

const filepath = path.join(process.cwd(), "hello.txt");

function run() {
    fs.readFile(filepath, "utf8").then((contents) => {
        console.log("File Contents:", contents);
    })
}

run();
```

or using async/await

```
async function run() {
  try {
    const contents = await fs.readFile(filepath, "utf8");
    console.log("File Contents:", contents);
  } catch (error) {
    console.error(error);
  }
}

run();
```

## Inspecting file metadata

fs API are modeled around POSIX (Portable Operating System Interface), that is a set of common interfaces to define software open source.
fs include also APIs to help you reading directories and metadata.

```
const fs = require("fs");
const file = process.argv[2]; // argv contains all arguments passed when launch node

function printMetadata(file) {
  try {
    const fileStats = fs.statSync(file);
    console.log(fileStats);
  } catch (err) {
    console.error("Error reading file path:", file);
  }
}

printMetadata(file);
```

This will print all information about a file, such as size, creation time, updated time and others.

## Checking file access

If you want to check the existence of a file, you can use:
`fs.access()` or `fs.accessSync()`
This function checks the permissions for accessing the file, like read, write or execute.

## Modifing file permissions

You can modify the permissions of files using:
`fs.chmod()` or `fs.chmodSync()`
passing the path and `mode` parameter, as constant or as bit mask:

```
const fs = require("fs");
const file = "./file.txt";

fs.chmodSync(
  file,
  fs.constants.S_IRUSR |
    fs.constants.S_IWUSR |
    fs.constants.S_IRGRP |
    fs.constants.S_IWGRP |
    fs.constants.S_IROTH
);
```

that's the same of:

```
const fs = require("fs");
const file = "./file.txt";

fs.chmodSync(file, 0o664);
```

## Inspecting symbolic links

A symbolic link or symlink is a special file that store a reference to another file or directory.
Using stat or statSync on a symbolic link, it will return the information about the file referenced.
If you want to have information about the symlink itself, you can use:
`fs.lstat()` or `fs.lstatSync()`

NB: To execute node script inline you can use a Node CLI called Node REPL (Read-Eval-Print Loop). Using REPL you needn't import core modules, it automatically includes them.

## Watching for file updates

In Node.js you can watch for changes to a file or directory.
Using `watchFile()` you can listen file changes:

```
const fs = require("fs");
const file = "./file.txt";

fs.watchFile(file, (current, previous) => {
  return console.log(`${file} updated ${(current.mtime)}`);
});
```

`watchFile` has three arguments:

- file
- options: an object with the following properties:
  - BigInt = when true, the numberic value returned from object of Stats would be specified as BigInt.
  - Persistent = indicate if Node should continue to run while file are listened for changes.
  - Interval = How often should be polled for changes.
- listener function: executed every change.

fs provide another API to listen file changes, but it's faster but less consistent across multiple platform.

`watch` has three arguments:

- file
- options: an object with the following properties:
  - Recursive = specify if changes should be watched also in sub directories.
  - Persistent = indicate if Node should continue to run while file are listened for changes.
  - Encoding = Specify encoding for filename.
- listener function: executed every change. It's slightly different frin watchFile, it receives an `eventType` (change or rename) and a `trigger`, the file that triggered the event.

```
const fs = require("fs");
const file = "./file.txt";
const moment = require("moment");

fs.watch(file, (eventType, filename) => {
  const time = moment().format("MMMM Do YYYY, h:mm:ss a");
  return console.log(`${filename} updated ${time}`);
});

```

## Creating TCP server and client communication
