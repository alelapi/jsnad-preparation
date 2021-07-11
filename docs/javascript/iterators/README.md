# Iterators and Iteration

## Synchronous iteration
- Iterable: an object that can be iterated over implementing a method whose key is `Symbol.iterator`.
- Iterator: an object returned by invoking `[Symbol.iterator]()` on an iterable. It wraps each iterated element in an object and returns it via its method `next()` – one at a time.
- IteratorResult: an object returned by `next()`. Property `value` contains an iterated element, property `done` is `true` after the last element (`value` can usually be ignored then; it’s almost always `undefined`).

```
interface Iterable {
    [Symbol.iterator]() : Iterator;
}
interface Iterator {
    next() : IteratorResult;
}
interface IteratorResult {
    value: any;
    done: boolean;
}
```

```
const iterable = ['a', 'b'];
const iterator = iterable[Symbol.iterator]();
iterator.next()
    //{ value: 'a', done: false }
iterator.next()
    //{ value: 'b', done: false }
iterator.next()
    //{ value: undefined, done: true }
```

## Asynchronous iteration

In asynchronous iterators, there are two main differences:
- The method key that mark as iterable is `Symbol.asyncIterator`.
- Method `next()` return a Promise for IteratorResult

```
interface AsyncIterable {
    [Symbol.asyncIterator]() : AsyncIterator;
}
interface AsyncIterator {
    next() : Promise<IteratorResult>;
}
interface IteratorResult {
    value: any;
    done: boolean;
}
```

```
async function f() {
    const asyncIterable = createAsyncIterable(['a', 'b']);
    const asyncIterator = asyncIterable[Symbol.asyncIterator]();
    console.log(await asyncIterator.next());
        // { value: 'a', done: false }
    console.log(await asyncIterator.next());
        // { value: 'b', done: false }
    console.log(await asyncIterator.next());
        // { value: undefined, done: true }
}
```
