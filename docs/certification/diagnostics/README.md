# Diagnostics

## Debugging Node.js

### Diagnosing issues with Chrome DevTools

- When launching node add the flag `--inspect`.
- In Chrome DevTools, go to link `chrome://inspect/#devices`
- You should see your entrypoint file. Click the relative link `inspect`
- In console, it will show a log with a link to your entrypoint file. Click on it, you'll see the source code of the file
- Add a breakpoint and navigate to the url

The ability to debug come from V8 Javascript Engine. Using the flag, V8 inspector will open a port that accept WebSocket connections, for listen for a debugging client.
Using the protocol `devtools://` Chrome will open a Chrome DevTools interface.
When we set a breakpoint and it's encountered, the event loop will be paused and V8 inspector will send a WebSocket message with the current state.
If we step into, a command will be send to V8 inspector that will temporarily resume the event loop execution.

You can use command line using the command `node inspect server.js`.
Debug mode will pause to the first line. You will see a `debug> ` mode.
You can type:

- help: for the list of commands
- line(x): show following x lines
- setBreakpoint(x) (or sb(x)): set a breakpoint at line x
- cont: continue after breakpoint
- step: step into function
- out: step out function

## Logging with Node.js (using pino)

- add dependencies `pino` and `express-pino-logger`
- after the PORT assignment, register pino:

```
const pino = require('pino')();
const logger = require('express-pino-logger') ({
    instance:pino
});
app.use(pino);
```

`express-pino-logger` is a middleware that enables Pino logging for Express web server. They are imported indipendentely so that we can interact with pino logger both directly and via our middleware.
Pino interface is based on Log4j. It allows to group your error message by level (trace, debug, info, error, warn and fatal).
This middleware adds a log object in the incoming request object. Then you can log calling `re.log.info()` (for an info log); it will also add a log for every request completed.

### Pino and web frameworks

It's possible to integrate Pino with other popular web frameworks:

- `express-pino-logger` = Express middleware for Pino
- `hapi-pino` = Hapi plugin for Pino
- `koa-pino` = Koa middleware for Pino
- `restify-pino` = Restify middleware for Pino

In Fastify, Pino is the built in logger, you just need to configure during require:

```
const fastify = require('fastify')({
    logger: true,
})
```

## Logging with Morgan

Morgan is an HTTP request logger middleware for Node.js, only for HTTP request and not for general purposes.
It's generally used with express. Using `express-generator` will create a skeleton that include already Morgan.

```
var logger = require('morgan');
app.use(logger('dev'));
```

with the parameter we can set the logging format.

## Logging with Winston

Winston expose an interface that is also similar to log4j interface. The difference between Pino and Winston is that Winston provide a large number of configuration options, and it includes log transformation and log rotations.

```
var winston = require('winston');
var expressWinston = require('express-winston'); //winston middleware
app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console({
            json: true //expose log in json format
        })
    ]
}));
```

## Enabling debug logs

`debug` is a small library utility used by Express,Koa and Mocha.
To enable, start the server with the following command:

`DEBUG=* node server.js`

you can also filter by log type specifing the value to DEBUG=.
For every request you can see in console the complete list of sub actions processed.

DEBUG is an environment variable that will be used by the internal module `debug` for print instructions.
You can add also custom debug message like so:

```
const debug = require('debug')('my-server'); //message will be prepended with 'my-server'
...

debug('My message');

```

## Enabling Node.js core debug logs

You can enable debug on internal Node.js setting the environment variable NODE_DEBUG to an internal flag such as :

- `timer` = timer core debug logs
- `http` = log for internal http module

and many other internal Node modules (`https`, `http2`,`cluster`,`module`,`worker`,`tls`...)
You can set multiple flags separating by commas.

## Increasing stack trace size

By default stack trace size it's limited to 10 lines. You can increase the size by setting using the flag:
`node --stack-trace-limit=20`
It's also possible to set by code with:
`Error.stackTraceLimit=20`
`Error.stackTraceLimit=Infinity` for no limit to stack trace.

### Asynchronous stack trace
