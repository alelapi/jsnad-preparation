# Export

The `export` statement is used when we create a modules and we want to export so that other applications can use it with `import` statement.

- Exported modules are in `strict mode` if you declare them as such.

- Export statement cannot be used in embedded scripts.
  - Embedded scripts in HTML:
    - by tag `<script></script>`, external or inline
    - in HTML event handler
    - in Url containing the `javascript:` protocol

## Export types

- Named exports (zero or more exports per module) = usefull if you need to export multiple values. You need to import them using exactly the same name.
- Default export (one per module) = You can import using any name.

## Re-exporting / aggregating

This can be achieved with:

```
export {
    default as function1, //default export
    function2 //named export
} from 'bar.js';
```
