# Control Flow

There are two types of API functions in Node.js:

- asynchronous, non-blocking functions - for example: fs.readFile(filename, [encoding], [callback]) - receive the result via a callback (after passing control to the event loop).
- synchronous, blocking functions - for example: fs.readFileSync(filename, [encoding]) - return a result.

A control flow function is a lightweight, generic piece of code which runs in between several asynchronous function calls and which take care of the necessary housekeeping to:

- control the order of execution,
- collect data,
- limit concurrency and
- call the next step in the program.

There are three basic patterns for this.

## 1: Series - an asynchronous for loop

Given this common function:

```
function async(arg, callback) {
  console.log('do something with \''+arg+'\', return 1 sec later');
  setTimeout(function() { callback(arg * 2); }, 1000);
}
```

```
var items = [ 1, 2, 3, 4, 5, 6 ];
var results = [];
function series(item) {
  if(item) {
    async( item, function(result) {
      results.push(result);
      return series(items.shift());
    });
  } else {
    return final();
  }
}
series(items.shift());
```

Basically, the callback pushes the result into the results array and then calls series with the next item in the items array. When the items array is empty, we call the final() function.

## 2: Full parallel - an asynchronous, parallel for loop

```
var items = [ 1, 2, 3, 4, 5, 6 ];
var results = [];

items.forEach(function(item) {
  async(item, function(result){
    results.push(result);
    if(results.length == items.length) {
      final();
    }
  })
});
```

We start async operations for each of the items immediately, then in the callback checks whether the number of results is equal to the number of items to process. If it is, then we call the final() function.

## 3: Limited parallel - an asynchronous, parallel, concurrency limited for loop

```
var items = [ 1, 2, 3, 4, 5, 6 ];
var results = [];
var running = 0;
var limit = 2;

function launcher() {
  while(running < limit && items.length > 0) {
    var item = items.shift();
    async(item, function(result) {
      results.push(result);
      running--;
      if(items.length > 0) {
        launcher();
      } else if(running == 0) {
        final();
      }
    });
    running++;
  }
}

launcher();
```

We start async operations until we reach the limit. In the callback decrements the number of running operations, and then check whether there are items left to process. If yes, then laucher() is run again. If there are no items to process and the current operation was the last running operation, then final() is called.
