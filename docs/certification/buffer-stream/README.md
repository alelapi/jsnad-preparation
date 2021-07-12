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


