# Prototypal inheritance

Prototypal inheritance is a language feature that helps in extend an object.
Every objects have a special hidden property `[[Prototype]]`, that is either null or references another object. That object is called “a prototype”.
When we read a property from an object, and it’s missing, JavaScript automatically takes it from the prototype. In programming, this is called “prototypal inheritance”.

The property `[[Prototype]]` is internal and hidden, but there are many ways to set it:
- use the special name __proto__:

```
let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};

rabbit.__proto__ = animal;
```

Limitations:
- The references can’t go in circles. JavaScript will throw an error if we try to assign __proto__ in a circle.
- The value of __proto__ can be either an object or null. Other types are ignored.

The prototype is only used for reading properties. Write/delete operations work directly with the object.

`this` is not affected by inheritance, this is always refered to the object before the dot.

For check if a property is an own property and not inherited, you can use `obj.hasOwnProperty(key)`.
