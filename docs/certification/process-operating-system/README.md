# Process/Operating System

The operating system is the host system on which a process runs and we can find information about the operating system using the core `os` module.

## Processes

A `process` object is a global object that provides information about, and control over, the current Node.js process. The process object is an instance of the `EventEmitter` and therefore able to register events. Two of the commonly used events are `beforeExit` and `exit`.

```
process.once('beforeExit', (code) => {
    setTimeout(() => { console.log('Do some work') }, 200);
    console.log('Process beforeExit event with code: ', code);
});

process.on('exit', (code) => {
    console.log('Process exit event with code: ', code);
});

console.log('This message is displayed first.');

```

beforeExit = event emitted when Node.js empties the event loop and has no additional work to schedule.
exit = event emitted when any additional work scheduled for the event loop will be abandoned.
uncaughtException = method used for exceptions that were not accounted for within the application and may cause the process to crash

### some process property

stdin = readable stream which means it behaves as an input.
stdout = writable streams meaning they act as outputs.
stderr = writable streams meaning they act as outputs.
cwd() = current working directory.
platform = the host operating system
pid = the id of the current process
cpuUsage() = the user and system CPU time usage of the current process
memoryUsage() = object describing the memory usage of the Node.js process measured in bytes.

## OS Module

The os module provides functions to retrieve information from operating system and the currently running program.

hostname() = the host name of the operating system as string
homedir() = the string path of the current user's home directory
tmpdir() = the operating system's default directory for temporary files as a string
type() = the operating system name as returned by uname
