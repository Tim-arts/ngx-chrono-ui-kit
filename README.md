# Chrono UI Kit

The namespace provides multiple libraries such as:

- The UI Kit itself (Angular [library](https://angular.io/guide/creating-libraries)). ⚠ Note: you have to install the
  dependencies in the `core` folder!
- A [eslint](https://eslint.org/) config (
  eslint-config, [node.js module](https://docs.npmjs.com/creating-node-js-modules))
- A [prettier](https://prettier.io/) config (prettier-config, node.js module)
- A [stylelint](https://stylelint.io/) config (stylelint-config, node.js module)

## Configuration

Once the project is downloaded, follow
the [installation steps](https://dev.azure.com/projetsrtm/EXO%20UI%20Kit/_artifacts/feed/Chrono_UI_Kit/connect/npm) from
Azure Devops.

## Running

If you want to develop the UI Kit library locally:

#### 1) At the root folder (here):

- `npm run watch:core`
- `cd dist/core`
- `npm link`

#### 2) Inside a consuming application (SPA):

- add this to the `tsconfig.json`
  ```
  "paths": {
    "@angular/*": [ "./node_modules/@angular/*" ]
  }
  ```
- add this to the `angular.json`:
  ```
  "preserveSymlinks": true
  ```
- run `npm link @ngx-chrono-ui-kit/core`

⚠ Note: If you delete the `dist` folder, the `npm link` will also be affected, you'll have to redo it.

## Building

Run `npm run build:core` to build the `core` library. The result will be stored in the `dist/` directory at the root of
the project.

⚠ Note: make sure to run the `npm run build:core` command in order to build the `core` library. `ng build` doesn't
perform `pre` and `post` operations.

## Publishing

After building your library, make sure you're located inside the `dist/core` folder before publishing the NPM package.
You'll also need to upgrade the version inside the ` package.json`  before running `npm run build` (i.e.: x.x.1 ->
x.x.2).

- go to the dist folder at the root of the project `cd dist/core`
- run `npm publish`
