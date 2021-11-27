# Callback Hell

It is a common problem when using callback that generate long nesting asynchronous function calls.
```
getData(function(x){
    getMoreData(x, function(y){
        getMoreData(y, function(z){ 
            ...
        });
    });
});
```
The cause of callback hell is when people try to write JavaScript in a way where execution happens visually from top to bottom.

## How do avoid callback hell

- Keep your code shallow: convert anonymous callback functions to named and separated functions, defined before your async statement.
- Modularize: move your named callback functions in a module. Async functions will only need to import and pass as argument.
- Handle errors: standard convention has an error flag or object as first argument. Always handle every error.