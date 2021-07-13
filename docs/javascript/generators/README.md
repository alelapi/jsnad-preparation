# Generator functions

The `function*` declaration defines a generator function, which returns a `Generator` object.
Generators are functions that can be exited and later re-entered. Their context (variable bindings) will be saved across re-entrances.

Generators in JavaScript are a very powerful tool for asynchronous programming as they mitigate the problems with callbacks, such as `Callback Hell` and `Inversion of Control`.

- Calling a generator function does not execute its body immediately; an iterator object for the function is returned instead.
- When the iterator's `next()` method is called, the generator function's body is executed until the first `yield` expression (return value), or to `yield*` that delegates to another generator function.
- Calling the `next()` method with an argument will resume the generator function execution, replacing the `yield` expression where an execution was paused with the argument from `next()`.
- A `return` statement in a generator, when executed, will make the generator finish.
- An error thrown inside the generator will make the generator finished, unless caught within the generator's body.


## Simple generator 
```
function* idMaker() {
  var index = 0;
  while (true)
    yield index++;
}

var gen = idMaker();

console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3
```

## Generator with yield*
```
function* anotherGenerator(i) {
  yield i + 1;
  yield i + 2;
  yield i + 3;
}

function* generator(i) {
  yield i;
  yield* anotherGenerator(i);
  yield i + 10;
}

var gen = generator(10);

console.log(gen.next().value); // 10
console.log(gen.next().value); // 11
console.log(gen.next().value); // 12
console.log(gen.next().value); // 13
console.log(gen.next().value); // 20
```

## Passing arguments
```
function* logGenerator() {
  console.log(0);
  console.log(1, yield);
  console.log(2, yield);
  console.log(3, yield);
}

var gen = logGenerator();

// the first call of next executes from the start of the function
// until the first yield statement
// the argument will replace `yield`
gen.next();             // 0
gen.next('pretzel');    // 1 pretzel
gen.next('california'); // 2 california
gen.next('mayonnaise'); // 3 mayonnaise
```

## Return statement
```
function* yieldAndReturn() {
  yield "Y";
  return "R";
  yield "unreachable";
}

var gen = yieldAndReturn()
console.log(gen.next()); // { value: "Y", done: false }
console.log(gen.next()); // { value: "R", done: true }
console.log(gen.next()); // { value: undefined, done: true }
```

## Generator as an object
```
const someObj = {
  *generator () {
    yield 'a';
    yield 'b';
  }
}

const gen = someObj.generator()

console.log(gen.next()); // { value: 'a', done: false }
console.log(gen.next()); // { value: 'b', done: false }
console.log(gen.next()); // { value: undefined, done: true }
```

## Generator as an object method
```
class Foo {
  *generator () {
    yield 1;
    yield 2;
    yield 3;
  }
}

const f = new Foo ();
const gen = f.generator();

console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }
```

## Generator as computed property
```
class Foo { //Foo is actually a generator
  *[Symbol.iterator] () {
    yield 1;
    yield 2;
  }
}

const SomeObj = {
  *[Symbol.iterator] () {
    yield 'a';
    yield 'b';
  }
  // Shorthand of:
  //[Symbol.iterator]: function* () {
  //  yield 'a';
  //  yield 'b';
  //}
}

console.log(Array.from(new Foo)); // [ 1, 2 ]
console.log(Array.from(SomeObj)); // [ 'a', 'b' ]
```