# Events

## The EventEmitter Module

The EventEmitter is a module that facilitates communication between objects in Node. Emitter objects emit named events that cause previously registered listeners to be called.
EventEmitter objects emit events and expose an eventEmitter.on() function that allows one or more functions to be attached to named events emitted by the object.
When the EventEmitter object emits an event, all of the functions attached to that specific event are called synchronously

```
class MyEmitter extends EventEmitter {

}

const myEmitter = new MyEmitter();
myEmitter.emit('something-happened');
```

Example:

```
const EventEmitter = require('events');

class WithLog extends EventEmitter {
  execute(taskFunc) {
    console.log('Before executing');
    this.emit('begin');
    taskFunc();
    this.emit('end');
    console.log('After executing');
  }
}

const withLog = new WithLog();

withLog.on('begin', () => console.log('About to execute'));
withLog.on('end', () => console.log('Done with execute'));

withLog.execute(() => console.log('*** Executing task ***'));
```

this will result in:

```
Before executing
About to execute
*** Executing task ***
Done with execute
After executing
```

### EventEmitter and asynchronous events

Rewrite the same example for asynchronous (callback-style) functions:

```
const fs = require('fs');
const EventEmitter = require('events');

class WithTime extends EventEmitter {
  execute(asyncFunc, ...args) {
    this.emit('begin');
    console.time('execute');
    asyncFunc(...args, (err, data) => {
      if (err) {
        return this.emit('error', err);
      }

      this.emit('data', data);
      console.timeEnd('execute');
      this.emit('end');
    });
  }
}

const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));

withTime.execute(fs.readFile, __filename);
```

Using async functions with event handlers is problematic, because it can lead to an unhandled rejection in case of a thrown exception. Setting `events.captureRejections = true` will change the default for all new instances of EventEmitter.

```
const events = require('events');
events.captureRejections = true;
const ee1 = new events.EventEmitter();
ee1.on('something', async (value) => {
  throw new Error('kaboom');
});

ee1.on('error', console.log);
```

### Events Arguments and Errors

We can use as many arguments as we need after the named event, and all these arguments will be available inside the listener functions we register for these named events.

```
this.emit('data', data);

emitter.on('data', (data) => {
  // do something with data
});
```

The `error` event is usually a special one. If we don’t handle the `error` event with a listener, the node process will actually exit.
You have to add a listener to error event to handle the error.
It is possible to monitor `error` events without consuming the emitted error by installing a listener using the symbol `events.errorMonitor`.
The other way to handle exceptions from emitted errors is to register a listener for the global uncaughtException process event. However, catching errors globally with that event is a bad idea.

The `EventEmitter` module exposes a `once` method. This method signals to invoke the listener just once, not every time it happens.

If we register multiple listeners for the same event, the invocation of those listeners will be in order. The first listener that we register is the first listener that gets invoked. But if you need to define a new listener, but have that listener invoked first, you can use the `prependListener` method:

```
myEmitter.on('data', (data) => {
  console.log('listener 1');
});

myEmitter.on('data', (data) => {
  console.log('listener 2');
});

myEmitter.prependListener('data', (data) => {
  console.log('listener 3');
});

withTime.execute(fs.readFile, __filename);
```

In this example, the output will be:

```
listener 3
listener 1
listener 2
```

If you need to remove a listener, you can use the `removeListener` method.
