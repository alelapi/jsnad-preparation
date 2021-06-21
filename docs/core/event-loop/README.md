# Node.Js Event loop

The Event Loop explains how Node.js can be asynchronous and have non-blocking I/O.

The Node.js JavaScript code runs on a single thread, so you haven't any concurrency issues but you need to be concerned that code will run on a single event loop.

**Blocking code**: Any JavaScript code that takes too long to return back control to the event loop.

### The call stack

The call stack is a LIFO stack. The event loop continuously checks it to see if there's any function that needs to run in order and add every function call to the stack, and repeat until the stack is empty.

### The message queue

Message queue is another stack that contains all user-initiated events like click, keyboard events, fetch responses, setTimeout callbacks or DOM events.
Event loop give priority to the call stack, and it first processes everything it finds in the call stack, and once there's nothing in there, it goes to pick up things in the message queue.

### ES6 Job Queue

Starting from ECMAScript 2015 Node JS has the Job Queue, which is used by Promises. It's a way to execute the result of an async function as soon as possible, rather than being put at the end of the call stack.
Promises that resolve before the current function ends will be executed right after the current function.
