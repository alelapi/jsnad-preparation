# Module Design Pattern

It is a Design Pattern used to wrap a set of variables and functions together in a single scope, defining objects and specify the variables and the functions that can be accessed from outside the scope of the function and others that can be private.

```
var makeCounter = function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },

    decrement: function() {
      changeBy(-1);
    },

    value: function() {
      return privateCounter;
    }
  }
};

var counter1 = makeCounter();
var counter2 = makeCounter();

```

In the example, `counter1` and `counter2` share the same definition but they have distinct lexical scope.

## Benefits:
- Maintainability: Module Patterns enable better maintainability since all the related code can be encapsulated inside a single logical block. These logically independent blocks are relatively easier to update.
- Reusability: We single unit of code can be reused across the entire application. Functionality enclosed as a module can be reused and we do not need to define the same functions at multiple points.