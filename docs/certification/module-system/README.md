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

### Development dependencies

To add development dependencies:

`npm install --save-dev --save-exact prettier`
`yarn add --dev --exact prettier`

### Global modules

You can install module globally. Tipically are binaries or a program you want to access from CLI.
Add global module:
`npm install --global lolcatjs`
`yarn global add lolcatjs`

It will not be installed in the node_modules folder, instead it will be installed in the bin folder of your Node.js installation.

To execute a module from CLI without installing it globally you can use `npx`.

## Setting up your own module

- Init new module
- Create github repository
- Add .gitignore
- Add readme
- Push to remote repository

## Implementing your module

- Create index.js file
- add your logic
- export with `module.export = myFunction`
- add custom scripts

## Preparing and publish your module

- Sign up for a npm account, then `npm login`
- Write module API in README.md file
- Create version tag in repository
- Publish module
  `npm publish --access=public`
  `yarn publish --access public`

## Prepublish scripts

npm support `prepublishOnly`, this script will run only before publish a new version, in order to catch mistakes before publication.
To do that, create your custom script named `prepublish`.

## .npmignore

In this file will be added a list of files to be omitted during publication, overriding .gitignore.
It's tipically used to ignore test files.

## Private registries

Tipically organizations need to keep some of their code off the public registry, so they use their private registries to share among members of the same company.
Private registries can also be used as a caching mechanism.
To change registry:
`npm config set registry https://registry.your-registry.npme.io/`
To see which registry you are pointing:
`npm config get registry`
To see all your config:
`npm config list`

## Using ECMAScript modules

ECMAScript is the language specification created to standardize JavaScript.
The CommonJS module specification is the standard used in Node.js for working with modules.
Client-side JavaScript that runs in the browser uses another standard, called ES Modules. Node.Js support them and provide a limited interoperability with CommonJs format, the original and default mode for Node.Js.

```
import express from "express";
import { name } from "./get-name/index.mjs"; // Our custom module that export variable `name`

const PORT = 3000;
const app = express();

app.get("/", (req, res) => res.send(`Hello from ${name}!`));

app.listen(PORT, () => {
  console.log("Express server started on port", PORT);
});
```

`.mjs` is the extensions for ECMAScript module files.
`.cjs` is the extensions for CommonJs module files.

You can use ECMAScript/CommonJs module globally with extension .js setting in package.json:

```
{
    type: "module" //for ECMAScript
    type: "commonjs" //for CommonJs
}
```

`export` syntax can be used to export object, functions, and values.

### How require works

The module loading mechanism in Node.js is caching the modules on the first require call. It means that every time you use require a module you will get the same instance of module, which ensures that the modules are singleton-like and have the same state across your application.
You can load native modules and path references from your file system or installed modules. 
If the identifier passed to the require function is not a native module or a file reference (beginning with /, ../, ./ or similar), then Node.js will look for installed modules in the `node_modules` folder. It starts from the parent directory of your current module and then moves to the parent directory until it finds the right module or until the root of the file system is reached.

The module dealing with module loading in the Node core is called `module.js`, and can be found in `lib/module.js` in the Node.js repository.
The most important functions to check here are the `_load` and `_compile` functions.

- Module._load
This function checks whether the module is in the cache already – if so, it returns the exports object. If the module is native, it calls the `NativeModule.require()` with the filename and returns the result.
Otherwise, it creates a new module for the file and saves it to the cache. Then it loads the file contents before returning its exports object.

- Module._compile
The compile function runs the file contents in the correct scope or sandbox, as well as exposes helper variables like `require`, `module` or `exports` to the file.