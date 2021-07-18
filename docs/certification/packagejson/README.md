# Package.json

Package.json is file that describe the application. It containins:

- dependencies
- version (using Semantic versioning rules)

## Dependencies

Dependencies are third party library or set of functions downloaded from the npm registry.

### Specify update types that a package can accept

- `~` : accept only new patch releases: ex: `~1.0.4`
- `^` : accept new patch and minor releases: ex: `^1.0.4`

## Developement dependencies

Dependencies can be distinct between development dependencies and regular dependencies. Dev dependencies are tipically used for tooling that supports you during development.
They should be not required to run your application and thet will omitted during deployment.

To add development dependencies:

`npm install --save-dev --save-exact prettier`
`yarn add --dev --exact prettier`

`exact` will point the exact version (es: `prettier: 2.0.5`)
