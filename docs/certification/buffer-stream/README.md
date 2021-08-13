# Buffer and Streams

`Buffers` are an abstraction that allows us to deal with raw binary data in Node.js. They are particularly relevant when we are dealing with files and networks or I/O in general.

You can create buffer from string, bytes array, hexadecimal string, base64 string.

```
const bufferFromString = Buffer.from('Ciao human')
const bufferFromByteArray = Buffer.from([67, 105, 97, 111, 32, 104, 117, 109, 97, 110])
const bufferFromHex = Buffer.from('4369616f2068756d616e', 'hex')
const bufferFromBase64 = Buffer.from('Q2lhbyBodW1hbg==', 'base64')
```

If you want to inspect the content of a Buffer instance you can do that with the `.toString(encoding)` method, which accepts different types of encoding such as `base64`, `hex` or `utf8` (default value).

```
bufferFromString.toString('utf-8') // Ciao human ('utf-8' is the default)
bufferFromString.toString('hex') // 4369616f2068756d616e
bufferFromString.toString('base64') // Q2lhbyBodW1hbg==

```

`Streams` is a key feature of NodeJS. Streams provide a mechanism to sequentially read input and write output in chunks.
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

Every chunk is a `Buffer` instance.

`createReadStream` and `createWriteStream` accept two parameters: `path` (of file) and `options`.
Check documentation for options availables (https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options).

Stream are instances of EventEmitter class. They can emit differents events:
Read Streams: `close`, `data`, `end`, `error`, `pause`, `readable`, `resume`.
Write Streams: `close`, `drain`, `finish`, `error`, `pipe`, `unpipe`.

## Readable Streams

A readable stream represents a source from which data is consumed.

Some common examples of Readable streams:

- Read a file from the filesystem: fs.createReadStream
- Command line standard input: process.stdin
- An HTTP response (received by a client)
- An HTTP request (received by a server)
- AWS S3 GetObject (data field)

A stream can be in **flowing mode** (data chunks read automatically) or **paused mode** (need to call `stream.read()`).

### Flowing streams:

Data is read from source automatically and chunks are emitted as soon as they are available. Every single time there's some data available a data event is emitted. When no more data is available, the end event is emitted.

```
const fs = require("fs");

const rs = fs.createReadStream("./file.txt");

rs.on("data", (data) => {
  console.log("Read chunk:", data);
});

rs.on("end", () => {
  console.log("No more data.");
});
```

### Paused streams:

The stream emits a `readable` event to signal that new data is available and the consumer have to call `read()` to read the data. If there's no more data in the internal buffer a call to read() will return null. Also in this mode, once all the data has been read, `end` is emitted.

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

### Asynchronous iterables

Readable Streams are also asynchronous iterables, so you can iterate using `for await...of`.

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

## Writable streams

A Writable stream is an abstraction that allows you to write data over a destination.

Some examples of Writable streams:

- Writing to a file with fs.createWriteStream()
- Command line standard output and standard error (process.stdout, process.stderr)
- An HTTP request (when sent by a client)
- An HTTP response (when sent by a server)
- AWS S3 PutObject (body parameter)

```
import { request } from 'http'

/*request(..) return a Writeable stream*/
const req = request(
  options, //url, method, path...
  (resp) => {} //callback
)

req.on('finish', () => console.log('request sent')) //request fully sent
req.on('close', () => console.log('Connection closed')) //connection closed
req.on('error', err => console.error(`Request failed: ${err}`)) //error

req.write('writing some content...\n') //send data to server
req.end('last write & close the stream') //end of sending data
```

### Backpressure

When you read from a stream and write to another one, if the readable stream is much more faster than the writable stream, it's possible that the writable stream will keep accumulating data to the point where it will crash. This problem is called **backpressure**.

You can manage this problem using the return value of `write()`, that is a boolean value indicating whether the destination is safe to continue accepting data. If the writable stream is not ready, it will emit a `drain` event when will be ready again.

```
function backpressureAwareCopy(srcStream, destStream) {
  srcStream.on('data', (chunk) => {
    const canContinue = destStream.write(chunk)
    if (!canContinue) {
      // if we are overflowing the destination, we stop reading
      srcStream.pause()
      /*once all the buffered data is flushed, we resume reading from source. We use once because we want to listen to drain event only one time when      the stream is overflowing*/
      destStream.once('drain', () => srcStream.resume())
    }
  })
}
```

## Transforming data with transform streams

A Duplex stream is essentially a stream that is both Readable and Writable. It is an ideal abstraction to represent readable and writable pipes like TCP connections.

Transform streams are a special class of Duplex streams that allow to consume input data, process that data and then output that processed data.
With transform stream you can:

- manipulate data functionally and asynchronously
- pipe many transformations to data

Some example are:

- Compression / Decompression
- Encryption / Decryption
- Data filtering and aggregation
- Data enrichment
- Media transcoding

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

We can insert a Transform stream between our Readable and Writable stream to transform data before write. We call our streams readable, one or more transform streams and writable:

```
readable
  .pipe(transform1)
  .pipe(transform2)
  .pipe(writable)
```

### ES6 syntax

```
const fs = require("fs");
const { Transform } = require("stream");

const rs = fs.createReadStream("./file.txt");
const newFile = fs.createWriteStream("./newFile.txt");

class Uppercase extends Transform {
  constructor() {
    super();
  }

  _transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
}

rs.pipe(new Uppercase()).pipe(newFile);
```

## Create object mode transform streams

By default streams operate with String, Buffer or Uint8Array, but it's also possible to work in object mode.
The main difference is that the value of `highWaterMark` refers to number of objects rather than bytes. To use object mode you need to set in `options`: `{ objectMode: true }`.

```
const { Transform } = require("stream");
const { stringify } = require("ndjson");

const Name = Transform({
  objectMode: true,
  transform: ({ forename, surname }, encoding, callback) => {
    callback(null, { name: forename + " " + surname });
  },
});

Name.pipe(stringify()).pipe(process.stdout);

Name.write({ forename: "John", surname: "Doe" });
```

In this example, we read an object as input, transform, stringify and finally print to stdout.
You can independently specify for read and write streams if they are in object mode and their waterMark (`readableObjectMode/writeableObjectMode`, `readableHighWaterMark/writeableHighWaterMark`).

## Building streams pipeline

Using `pipe` you have to handle error in every single step. You can use method `pipeline()` to chain multiple streams together, allowing also to handle errors.
`stream.pipeline(...streams, callback)`

```
const fs = require("fs");
const { pipeline, Transform } = require("stream");

const uppercase = new Transform({
  transform(chunk, encoding, callback) {
    // Data processing
    callback(null, chunk.toString().toUpperCase());
  },
});

pipeline(
  fs.createReadStream("./file.txt"),
  uppercase,
  fs.createWriteStream("./newFile.txt"),
  (err) => {
    if (err) {
      console.error("Pipeline failed.", err);
    } else {
      console.log("Pipeline succeeded.");
    }
  }
);
```

Arguments:

- `source`: source stream
- `...transforms`: any number of transform streams
- `destination`: destination stream
- `callback`: function called after the pipeline is completed

### Promisify pipelines

You can use pipelines in Promise form using `util.promisify()` that will convert to a Promise a callback-style function.

```
const fs = require("fs");
const stream = require("stream");
const util = require("util");

const pipeline = util.promisify(stream.pipeline);

const uppercase = new stream.Transform({
  transform(chunk, encoding, callback) {
    // Data processing
    callback(null, chunk.toString().toUpperCase());
  },
});

async function run() {
  await pipeline(
    fs.createReadStream("./file.txt"),
    uppercase,
    fs.createWriteStream("./newFile.txt")
  );
  console.log("Pipeline succeeded.");
}

run().catch((err) => {
  console.error("Pipeline failed.", err);
});
```

### Composability and pumpify

You can generally see the source Readable stream as the input, the chain of Transform streams as business logic and the Writable stream as an output.
You can expose all the business logic as a separate module independent from the Readable source and the Writable destination using the module `pumpify`.

```
import pumpify from 'pumpify'

// ... create all the stream instances here

const myTransformPipeline = pumpify(
  decompressStream,
  decryptStream,
  convertStream,
  encryptStream,
  compressStream
)

export default myTransformPipeline
```

If one of the streams closes or generates an error, all the streams in the pipeline will be destroyed.

## Custom streams

`readable-stream` is a very useful module from NPM. It allows to:

- use the latest stream features regardless of what version of Node.js is running your code
- make streams compatible with the browser

### Custom readable streams

- Extend `Readable` class
- Implements `_read()` method. Inside this call `this.push(data)` to emit data event. `this.push(null)` will emit end event.

If your custom stream does not differ so much from the standard, you can do that instantiating a Readable stream and passing to it the `read()` method.

Yoou can create streams that emit objects instead of strings or buffers, setting the option `objectMode: true`:

```
import { Readable } from 'readable-stream'

export default class DateStream extends Readable {
  constructor (options = {}) {
    options.objectMode = true // forces object mode
    super(options)
  }

  _read () {
    this.push(new Date())
  }
}
```

### Custom transform streams

- Extend `Transform` class
- Implements `_transform()` method. It accepts the following parameters:
  - `chunk`: the current chunk of data to transform
  - `enc`: a string that represents the current encoding of the data
  - `cb`: a callback to invoke when the transformation is done. This allows you to have asynchronous transformations.

```
import { Transform } from 'readable-stream'

export default class Uppercasify extends Transform {
  _transform (chunk, encoding, done) {
    this.push(chunk.toString().toUpperCase())
    done()
  }
}
```
