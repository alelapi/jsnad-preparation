# Writing function conventions

- 1. Be clear about what your function does.
  - what arguments it expects
  - the types of each of those arguments
  - any additional constraints on those arguments
  - If any of these are wrong or missing, that’s a programmer error, and you should throw immediately.
  - what operational errors callers should expect (including their names)
  - how to handle operational errors
  - the return value
- 2. Use Error objects (or subclasses) for all errors, and implement the Error contract.
- 3. Use the Error’s name property to distinguish errors programmatically.
- 4. Augment the Error object with properties that explain details
  - name: used to programmaticaly distinguish between broad types of errors
  - message: a human-readable error message
  - stack: generally, don’t even augment it

5. If you pass a lower-level error to your caller, consider wrapping it instead.
   If asynchronous function funcA calls some other asynchronous function funcB, and that if funcB emits an Error, consider wrapping the Error instead of returning it directly. By wrapping, we mean propagating a new Error that includes all of the information from the lower level, plus additional helpful context based on the current level. If you wrap, consider this rules:

   - Leave the original error intact and unchanged.
   - Either use the same “name” for your error, or else explicitly choose one that makes more sense
   - Preserve all of the properties of the original error

An example
Consider a function that asynchronously connects to a TCP port at an IPv4 address. Here’s an example of how we might document it:

```
/\*

- Make a TCP connection to the given IPv4 address. Arguments:
-
- ip4addr a string representing a valid IPv4 address
-
- tcpPort a positive integer representing a valid TCP port
-
- timeout a positive integer denoting the number of milliseconds
-                   to wait for a response from the remote server before
-                   considering the connection to have failed.
-
- callback invoked when the connection succeeds or fails. Upon
-                   success, callback is invoked as callback(null, socket),
-                   where `socket` is a Node net.Socket object.  Upon failure,
-                   callback is invoked as callback(err) instead.
-
- This function may fail for several reasons:
-
- SystemError For "connection refused" and "host unreachable" and other
-                   errors returned by the connect(2) system call.  For these
-                   errors, err.errno will be set to the actual errno symbolic
-                   name.
-
- TimeoutError Emitted if "timeout" milliseconds elapse without
-                   successfully completing the connection.
-
- All errors will have the conventional "remoteIp" and "remotePort" properties.
- After any error, any socket that was created will be closed.
  \*/
  function connect(ip4addr, tcpPort, timeout, callback) {
  assert.equal(typeof (ip4addr), 'string',
  "argument 'ip4addr' must be a string");
  assert.ok(net.isIPv4(ip4addr),
  "argument 'ip4addr' must be a valid IPv4 address");
  assert.equal(typeof (tcpPort), 'number',
  "argument 'tcpPort' must be a number");
  assert.ok(!isNaN(tcpPort) && tcpPort > 0 && tcpPort < 65536,
  "argument 'tcpPort' must be a positive integer between 1 and 65535");
  assert.equal(typeof (timeout), 'number',
  "argument 'timeout' must be a number");
  assert.ok(!isNaN(timeout) && timeout > 0,
  "argument 'timeout' must be a positive integer");
  assert.equal(typeof (callback), 'function');

/_ do work _/
}
```
