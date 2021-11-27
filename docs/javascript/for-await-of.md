# For await...of
The `for await...of` statement creates a loop iterating over async iterable objects as well as on sync iterables, including: built-in String, Array, Array-like objects (e.g., arguments or NodeList), TypedArray, Map, Set, and user-defined async/sync iterables. 

## Synchronous iterables
`for-await-of` handles synchronous iterables by converting them to asynchronous iterables, each iterated value is converted to a Promise (or left unchanged if it already is a Promise) via `Promise.resolve()`.

```
async function main() {
    const syncIterable = [
        Promise.resolve('a'),
        Promise.resolve('b'),
    ];
    for await (const x of syncIterable) {
        console.log(x);
    }
}
main();

// Output:
// a
// b
```

## Asynchronous iterables

```
async function f() {
    for await (const x of createAsyncIterable(['a', 'b'])) {
        console.log(x);
    }
}
// Output:
// a
// b
```

The loop throws an exception if `next()` returns a rejection.