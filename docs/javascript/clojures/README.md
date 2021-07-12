# Clojures

A closure is the combination of a function and the lexical environment within which that function was declared.
Clojures gives you access to an outer function’s scope from an inner function.

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

`add5` and `add10` are both clojures. They share the same function body definition, but store different lexical environments.

With clojures you can also emulate private methods, using IIFE in a Module Design Pattern.
