# Unit testing

## Testing with tape

Tape = TAP-producing test library for Node.Js and browsers
TAP = Test Anything Protocol

- Install `tape` as development dependency

Example test file:

```
const test = require("tape");
const calculator = require("./../calculator.js");

test("test add integers 1 and 2", (t) => {
  t.plan(1); //indicate how many assertions should be test
  t.equal(calculator.add(1, 2), 3); //assertion; function result, expected value
});
```

You can use many type of assertion other than `equal`.

## Testing with Mocha

Mocha is a test framework for Node.js and browsers.

- Install `mocha` as development dependency
- Because it doesn't include an assertion framework, you need also to install `chai` as development dependency

Example test file:

```
const assert = require("chai").assert;
const calculator = require("../calculator.js");

describe("Calculator Test", function () { //'describe' define a collection of tests
  describe("add() Test", function () {
    it("add(1,2) should return 3", function () { //'it' define a test case
      assert.equal(calculator.add(1, 2), 3);
    });
  });
});
```

Chai provide other assertions format:

```
assert.equal(calculator.add(1, 2), 3);
expect(calculator.add(1, 2)).to.equal(3);
calculator.add(1, 2).should.equal(3);
```

Mocha provides other features methods to be runned before or after tests: `before()`, `beforeEach()`, `after()`, `afterEach()`

## Testing with Jest

Jest is a test framework commonly used for React applications but also for Node.js.
It has a similar interface to Mocha but it has a built-in assertion framework.

- Install `jest` as development dependency

Example test file:

```
const uppercase = require("./../uppercase");

describe("uppercase", () => { //'describe' define a collection of tests
  test("uppercase hello returns HELLO", () => { //'test' define a test case
    expect(uppercase("hello")).toBe("HELLO");
  });
});
```

`expect` expose many assertion method, such as `toBe`, `toContain`, `toThrow`

Jest provide a built-in code coverage feature, you can enable using a flag:
`npm jest --coverage`
It measures how many line of code are touched when we execute the tests.

### Setup and teardown

Like Mocha, it provides other features methods to be runned before or after tests: `beforeAll()`, `beforeEach()`, `afterAll()`, `afterEach()`

### Mocking with Jest
