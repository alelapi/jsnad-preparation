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

Jest provide mocking of functions.

```
let uppercase = require("./../uppercase");
...
uppercase = jest.fn(() => "HELLO")
```

`uppercase` is a new mocked function that return HELLO without calling the real function.

from Expect, you can use `toHaveBeCalledWith` to check how that mocked function is called.

## Stubbing HTTP requests

Stubbing = fake HTTP requests and responses, use for mimic external API calls.

Example of stubbing using Sinon.js:

- Install `sinon` as development dependency

```
const test = require("tape");
const sinon = require("sinon");

const github = require("../github.js"); //External API to be stubbed
const octokitUserData = require("./octokitUserData.js"); //Mocked response

test("Get GitHub user by username", async function (t) {
  t.plan(3);

  sinon.stub(github, "getGitHubUser").returns(octokitUserData);

  const githubUser = await github.getGitHubUser("octokit");

  t.equal(githubUser.id, 3430433);
  t.equal(githubUser.login, "octokit");
  t.equal(githubUser.name, "Octokit");
});
```

## Using Puppeteer

Puppeteer is an open source library used to automate UI Tests. It provides an headless Chrome instance that can be programmatically interacted with.
Using a headless Chrome instance it's less performant than other types of tests but it will simulate very close to real user interactions.
It's also possible to use Puppeteer with non-headless Chrome instances. (`puppeteer.launch({ headless: false })`)

- Install `puppetter` as development dependency

```
const assert = require("assert");
const puppeteer = require("puppeteer");

async function runTest() {
  const browser = await puppeteer.launch(); // launch Puppeteer
  const page = await browser.newPage(); // create new browser page
  await page.goto("https://example.com"); // load the URL
  const title = await page.$eval("h1", (el) => el.innerText); //get innerText of h1 element

  console.log("Title value:", title);
  assert.equal(title, "Example Domain");

  browser.close();
}

runTest();
```

## Configuring Continous Integration Tests

Continous Integration (CI) is a development practice where developers regularly merge their code to a source repository.
To maintain the integrity of the source code, automated tests will often be run before each code change is accepted.
There are many CI products that allow you to execute unit tests. One of the most popular is Travis CI, other are Github Actions, CircleCI.

Examble of configuring CI using Travis CI:

- Create `.travis.yml` file with this content:

  ```
  language: node_js
  node_js:
  - 14
  ```

  in this example we specify Node.js version 14. It's possible to specify multiple versions, Travis will create a build for every version.

- Navigate to `https://travis-ci.com`, click activate then approve and install your Github repo.
- By default Travis is configured to execute a build upon a commit being pushed to any branch. So every time we push an update, a build will be triggered.

Travis will install dependencies executing `npm install` or `yarn`. If it's present a `package-lock.json` or a `yarn.lock` file it will execute `npm ci` or `yarn --frozen-lockfile`, to start from a clean build.

After installation will run `npm test` or `yarn test`.
