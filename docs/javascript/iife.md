# IIFE (Immediately Invoked Function Expression)

An IIFE is a JavaScript function that runs as soon as it is defined.

```
(function () {
  statements
})();
```

## Use cases

- Avoid polluting the global namespace
Our application could include many functions and global variables from different source files, so it's important to limit the number of global variables. If we have some initiation code that we don't need to use again, we could use the IIFE pattern. As we will not reuse the code again, using IIFE in this case is better than using a function declaration or a function expression.

- The module pattern
We can use IIFE to create private and public variables and methods.

- For loop with var before ES6
Before the introduction of the statements `let` and `const` in ES6 and the block scope we had only `var`, so we had only function scopes and the global scope. We could use IIFE to use a local variable within a cicle, without referencing to the global one.

