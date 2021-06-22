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

### Event loop order of operations

<pre><code>   ┌───────────────────────────┐
┌─&gt;│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │&lt;─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
</code></pre>

Each phase has a FIFO queue of callbacks to execute. When the event loop enters a given phase, it will perform any operations specific to that phase, then execute callbacks in that phase's queue until the queue has been exhausted or the maximum number of callbacks has executed. When the queue has been exhausted or the callback limit is reached, the event loop will move to the next phase, and so on.

#### Phases

**timers:** this phase executes callbacks scheduled by setTimeout() and setInterval().

**pending callbacks:** executes I/O callbacks for some system operations such as types of TCP errors that was deferred to the next loop iteration.

**idle, prepare:** only used internally.

**poll:** retrieve new I/O events; execute I/O related callbacks (almost all with the exception of close callbacks, the ones scheduled by timers, and setImmediate()); node will block here when appropriate.
It has two main functions:

- Calculating how long it should block and poll for I/O
- Processing events in the poll queue.

If there are not timer scheduled:

- If poll queue is not empty it will iterate through its queue of callbacks executing them synchronously until either the queue has been exhausted.
- If the poll queue is empty, it can happen:

  - If scripts have been scheduled by setImmediate(), the event loop will end the poll phase and continue to the check phase to execute those scheduled scripts.
  - If scripts have not been scheduled by setImmediate(), the event loop will wait for callbacks to be added to the queue, then execute them immediately.

Once the poll queue is empty the event loop will check for timers whose time thresholds have been reached. If one or more timers are ready, the event loop will wrap back to the timers phase to execute those timers' callbacks.

**check:** Execute callbacks immidiately after pool phase completed, queued with setImmediate(). Pool phase will not wait for poll events as usual but it will immidiately execute check phase scripts.

**close callbacks:** If a socket or handle is closed abruptly, the 'close' event will be emitted in this phase.
