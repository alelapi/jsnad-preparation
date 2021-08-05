# Child Processes

Node is designed for building distributed applications with many nodes. Using multiple processes is the best way to scale a Node application.

We can spin a child process using Node’s `child_process` module and those child processes can:

- communicate with each other with a messaging system
- enables us to access Operating System functionalities by running any system command inside a child process.
- control that child process input stream and listen to its output stream.
- control the arguments to be passed to the underlying OS command
- control that command’s output. (For example, we can pipe the output of one command as the input to another (just like we do in Linux) as all inputs and outputs of these commands can be presented to us using Node streams).

There are four different ways to create a child process in Node: `spawn()`, `fork()`, `exec()`, and `execFile()`.

## spawn()

`spawn` launches a command in a new process and we can use it to pass that command any arguments.

The result of executing the spawn function is a `ChildProcess` instance, which implements the EventEmitter API, so we can register handlers for events on this child object directly.

```
const { spawn } = require("child_process");
const child = spawn("find", [".", "-type", "f"]);

child.on("exit", function(code, signal) {
  console.log(
    "child process exited with " + `code ${code} and signal ${signal}`
  );
});

```

First argument is the command, second argument is the arguments.

ChildProcess events:
`exit` = process exited
`disconnect` = the parent process manually calls the child.disconnect method.
`error` = if the process could not be spawned or killed.
`close` = event is emitted when the stdio streams of a child process get closed.
`message` = emitted when the child process uses the `process.send()` function to send messages. This is how parent/child processes can communicate with each other.

ChildProcess also has the standard three stdio streams `child.stdin`, `child.stdout`, and `child.stderr`.

We can listen to different events on those stdio streams that are attached to every child process, but unlike in a normal process though, in a child process the `stdout`/`stderr` streams are readable streams while the `stdin` stream is a writable one. This is basically the inverse of those types found in a main process.

```
child.stdout.on("data", data => {
  console.log(`child stdout:\n${data}`);
});

child.stderr.on("data", data => {
  console.error(`child stderr:\n${data}`);
});
```

if we get an error while executing the command, data event of stderr will triggered and child the error event handler will report exit code 1.

A child process stdin is a writable stream. We can use it to send a command some input for example using the pipe function:

```
const { spawn } = require("child_process");

const child = spawn("wc");

process.stdin.pipe(child.stdin);

child.stdout.on("data", data => {
  console.log(`child stdout:\n${data}`);
});
```

We can also pipe commands:

```
const { spawn } = require("child_process");

const find = spawn("find", [".", "-type", "f"]);
const wc = spawn("wc", ["-l"]);

find.stdout.pipe(wc.stdin);

wc.stdout.on("data", data => {
  console.log(`Number of files ${data}`);
});
```

## exec()

exec function is slightly less efficient than spawn because create a shell, so you use all shell syntax.
Also it buffers the command's generated output and passes the whole output value to a callback function instead of using streams.

Previous example implemented with exec:

```
const { exec } = require("child_process");

exec("find . -type f | wc -l", (err, stdout, stderr) => {
  if (err) {
    console.error(`exec error: ${err}`);
    return;
  }

  console.log(`Number of files ${stdout}`);
});
```

The `exec` function buffers the output and passes it to the callback function (the second argument to exec) as the `stdout` argument there. This stdout argument is the command’s output that we want to print out.

You can use shell also with spawn:

```
const child = spawn("find . -type f | wc -l", {
  stdio: "inherit", //the child process inherits the main process stdin, stdout, and stderr
  shell: true,
  cwd: "[working directory]",
  env: { ANSWER: 42 } //child process only envs,
  detached: true, //run independently from parent process
});

child.unref(); //using unref, parent process can exit indipendently
```

And with this code we still get the advantage of the streaming of data that the spawn function gives us.

## execFile()
