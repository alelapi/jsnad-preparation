# Closures

A closure is the combination of a function and the lexical environment within which that function was declared.
Closures gives you access to an outer function’s scope from an inner function.

```
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12
```

`add5` and `add10` are both closures. They share the same function body definition, but store different lexical environments.

The possibility to associate data (the lexical environment) with a function that operates on that data has obvious parallels to object-oriented programming, where objects allow you to associate data (the object's properties) with one or more methods.

With closures you can also emulate private methods, using IIFE in a Module Design Pattern.

```
var counter = (function() {
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
  };
})();
```
