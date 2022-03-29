# Node.js CLI

Node.js comes with a variety of CLI options. These options expose built-in debugging, multiple ways to execute scripts, and other helpful runtime options.

`node [options] [V8 options] [script.js | -e "script" | -] [--] [arguments]`

- All options allow words to be separated by both dashes (-) or underscores (\_)
- If an option that takes a single value is passed more than once, then the last passed value is used
- Options from the command line take precedence over options passed through the NODE_OPTIONS environment variable

## Options

Some of options available:

- `--enable-source-maps` = Enable Source Map v3 support for stack traces.
- `--icu-data-dir=file` = Specify ICU data load path. (Overrides NODE_ICU_DATA.)

ICU (International Components for Unicode) = Libraries providing Unicode and Globalization support for software applications. Some services provided:

  - Code Page Conversion: Convert text data to or from Unicode and nearly any other character set or encoding.
  - Collation: Compare strings according to the conventions and standards of a particular language, region or country.
  - Formatting: Format numbers, dates, times and currency amounts according the conventions of a chosen locale.
  - Time Calculations: Multiple types of calendars are provided beyond the traditional Gregorian calendar.
  (see more at http://site.icu-project.org/)

- `--input-type=type` = (type = commonjs/module) Configures Node.js to interpret string input as CommonJS or as an ES module
- `--inspect[=[host:]port]` = Activate inspector on `host:port`. Default is 127.0.0.1:9229.
- `--max-http-header-size=size` = Specify the maximum size, in bytes, of HTTP headers. Defaults to 16 KB.
- `--no-deprecation` = Silence deprecation warnings.
- `--no-force-async-hooks-checks` = Disables runtime checks for async_hooks. These will still be enabled dynamically when async_hooks is enabled.
- `--no-warnings` = Silence all process warnings (including deprecations).
- `--node-memory-debug` = Enable extra debug checks for memory leaks in Node.js internals. This is usually only useful for developers debugging Node.js itself.
- `--preserve-symlinks` = Instructs the module loader to preserve symbolic links when resolving and caching modules.

By default, when Node.js loads a module from a path that is symbolically linked to a different on-disk location, Node.js will dereference the link and use the actual on-disk "real path" of the module as both an identifier and as a root path to locate other dependency modules. In most cases, this default behavior is acceptable. However, when using symbolically linked peer dependencies the default behavior causes an exception to be thrown if moduleA attempts to require moduleB as a peer dependency.

`--prof` = Generate V8 profiler output.
`--prof-process` = Process V8 profiler output generated using the V8 option --prof.
`--report-filename=filename` = Name of the file to which the report will be written.
`--report-on-fatalerror` = Enables the report to be triggered on fatal errors (internal errors within the Node.js runtime such as out of memory) that lead to termination of the application. Useful to inspect various diagnostic data elements such as heap, stack, event loop state, resource consumption etc. to reason about the fatal error.
`--report-uncaught-exception` = Enables report to be generated on uncaught exceptions. Useful when inspecting the JavaScript stack in conjunction with native stack and other runtime environment data.
`--unhandled-rejections=mode` = Using this flag allows to change what should happen when an unhandled rejection occurs. One of the following modes can be chosen:

- throw: Emit unhandledRejection. If this hook is not set, raise the unhandled rejection as an uncaught exception. This is the default.
- strict: Raise the unhandled rejection as an uncaught exception.
- warn: Always trigger a warning, no matter if the unhandledRejection hook is set or not but do not print the deprecation warning.
- warn-with-error-code: Emit unhandledRejection. If this hook is not set, trigger a warning, and set the process exit code to 1.
- none: Silence all warnings.

## Environment variables

Some of envs available:

`NODE_DEBUG=module[,…]` = ','-separated list of core modules that should print debug information.
`NODE_ICU_DATA=file` = Data path for ICU (Intl object) data. Will extend linked-in data when compiled with small-icu support.
`NODE_NO_WARNINGS=1` = When set to 1, process warnings are silenced.
`NODE_OPTIONS=options...` = A space-separated list of command-line options. `options...` are interpreted before command-line options, so command-line options will override or compound after anything in `options...`. Node.js will exit with an error if an option that is not allowed in the environment is used, such as -p or a script file.
`NODE_PATH=path[:…]` = ':'-separated list of directories prefixed to the module search path. On Windows, this is a ';'-separated list instead.
`NODE_TLS_REJECT_UNAUTHORIZED=value` = If value equals '0', certificate validation is disabled for TLS connections. This makes TLS, and HTTPS by extension, insecure. The use of this environment variable is strongly discouraged.
`SSL_CERT_FILE=file` = If --use-openssl-ca is enabled, this overrides and sets OpenSSL's file containing trusted certificates.
Be aware that unless the child environment is explicitly set, this environment variable will be inherited by any child processes, and if they use OpenSSL, it may cause them to trust the same CAs as node.

## Useful V8 options

`--max-old-space-size=SIZE (in megabytes)` = Sets the max memory size of V8's old memory section. As memory consumption approaches the limit, V8 will spend more time on garbage collection in an effort to free unused memory.
On a machine with 2 GB of memory, consider setting this to 1536 (1.5 GB) to leave some memory for other uses and avoid swapping.

`node --max-old-space-size=1536 index.js`
