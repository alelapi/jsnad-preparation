# For await...of
The `for await...of` statement creates a loop iterating over async iterable objects as well as on sync iterables, including: built-in String, Array, Array-like objects (e.g., arguments or NodeList), TypedArray, Map, Set, and user-defined async/sync iterables. 

It invokes a custom iteration hook with statements to be executed for the value of each distinct property of the object. This statement can only be used inside an async function.