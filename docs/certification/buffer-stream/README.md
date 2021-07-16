# Buffer and Streams

Streams is a key feature of NodeJS. Streams provide a mechanism to sequentially read input and write output in chunks.
They are often used in big data applications or media streaming services, where the data is too large to consume at once.

There are four types of streams:

- **Readable streams**
- **Writable streams**
- **Duplex Streams**
- **Transform Stream**

## Creating streams

Stream API is provided by the `stream` core module.
We can create stream for example reading/writing file:

```
const fs = require("fs");

const file = fs.createWriteStream("./file.txt");

for (let i = 0; i <= 1000000; i++) {
  file.write(
    "Node.js is a JavaScript runtime built on Google Chrome's V8 JavaScript engine.\n"
  );
}

```

```
const fs = require("fs");

const rs = fs.createReadStream("./file.txt");

rs.on("data", (data) => {
  console.log("Read chunk:", data.toString());
});

rs.on("end", () => {
  console.log("No more data.");
});
```

`createReadStream` and `createWriteStream` accept two parameters: `path` (of file) and `options`.
Check documentation for options availables (https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options).

Stream are instances of EventEmitter class. They can emit differents events:
Read Streams: `close`, `data`, `end`, `error`, `pause`, `readable`, `resume`.
Write Streams: `close`, `drain`, `finish`, `error`, `pipe`, `unpipe`.

## Readable Streams

Readable Streams are asynchronous iterables, so you can iterate using `for await...of`.

```
const fs = require("fs");

const rs = fs.createReadStream("./file.txt");

async function run() {
  for await (const chunk of rs) {
    console.log("Read chunk:", chunk);
  }
  console.log("No more data.");
}

run();
```

`stream` module also expose a method `Readable.from()` that create readable streams with iterators.

```
const { Readable } = require("stream");

async function* generate() {
  yield "Node.js";
  yield "is";
  yield "a";
  yield "JavaScript";
  yield "Runtime";
}

const readable = Readable.from(generate());

readable.on("data", (chunk) => {
  console.log(chunk);
});
```

## Interacting with paused streams

A stream can be in flowing mode (data chunks read automatically) or paused mode (need to call `stream.read()`).

Paused streams:

```
const fs = require("fs");

const rs = fs.createReadStream("./file.txt");

rs.on("readable", () => {
  // Read data
  let data = rs.read();
  while (data !== null) {
    console.log("Read chunk:", data);
    data = rs.read();
  }
});

rs.on("end", () => {
  console.log("No more data.");
});
```

Paused mode is the default mode for a readable stream. It will switch to flowing mode in the following cases:

- when a `data` event is registred
- when the `pipe()` method is called
- when the `resume()` method is called

If the stream is in flowing mode, it will switch to paused mode in the following cases:

- when the `pause()` method is called and there is no pipe destinations
- when the `unpipe()` method is called on all pipe destinations
- when a `readable` event is registred

## Piping streams

Piping stands for one-way redirection between streams.

```
const fs = require("fs");
const rs = fs.createReadStream("file.txt");
rs.pipe(process.stdout);
```

This simple code create a readable stream and pipe the output to `process.stdout`, `pipe()` will write the incoming data to destionation stream.
Under the cover, pipe also manages any possible problem of backpressure, that is when reading stream is much faster than write stream; this could produce a large amount of memory kept in before write to destination stream.

By default, when the stream reach the end will emit an `end` event that we will be catched by `stream.end()` on destination stream, that will close the stream. You can avoid this behaviour by setting an option.

## Transforming data with transform streams

Transform streams allow to consume input data, process that data and then output that processed data.
They are duplex streams, which means they implements both readable and writeable interfaces.
With transform stream you can:

- manipulate data functionally and asynchronously
- pipe many transformations to data

```
const fs = require("fs");
const { Transform } = require("stream");

const rs = fs.createReadStream("./file.txt");

const newFile = fs.createWriteStream("./newFile.txt");

const uppercase = new Transform({
  transform(chunk, encoding, callback) {
    // Data processing
    callback(null, chunk.toString().toUpperCase());
  },
});

rs.pipe(uppercase).pipe(newFile);
```

`Transform` class constructor support two parameters:

- `transform` = the function that implements transformation.
- `flush` = if transform process emit additional data, this method is used to flush the data.

`transform` method accept these parameters:

- `chunk` = the data to be transformed.
- `encoding` = if a string, encoding will be of the type specified. If it's a buffer the type will be a buffer.
- `callback(error, transformedChunk)` = callback function called after transformation.

### ES6 syntax
