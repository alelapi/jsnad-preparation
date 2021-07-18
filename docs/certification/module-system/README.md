# Module System

Modules are libraries or set of functions you want include in your application.

## Consuming modules

Initialize project:
`npm init`
`yarn init`

options:

- `package name`
- `version`
- `description`
- `git repository`
- `keywords`
- `author`
- `license`

This will create a `package.json` file containing:

- dependencies
- version (using Semantic versioning rules)

Add module:
`npm install express`
`yarn add express`

It will reach out the npm registry and download the package and save into the `node_modules` folder.

Include in a .js file:
`const express = require('express')`
