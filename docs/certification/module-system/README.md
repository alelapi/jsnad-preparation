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
ECMAScript modules are official format to package JavaScript code for reuse.
Node.Js support them and provide a limited interoperability with CommonJs format, the original and default mode for Node.Js, but they are still currently experimental.
Support is enabled from version `13.2.0`.

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
