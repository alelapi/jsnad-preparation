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
