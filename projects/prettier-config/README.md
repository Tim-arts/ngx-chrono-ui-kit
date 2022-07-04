# Prettier config

#### 1) Installation

In order to install this linter you need to run these commands:

`npm i prettier @ngx-chrono-ui-kit/eslint-config --save-dev`

#### 2) Configuration

Then create a `.prettierrc.js` file at the root of your project containing the following content:

```
module.exports = {
  ...require('@ngx-chrono-ui-kit/prettier-config'),
}

```

#### 3) Usage

Depending on your IDE, you would probably need to set it up, so it performs linting action `on save`

#### 4) Contributing

You may contribute and change the linter rules. To do so, navigate into the library folder with `cd prettier-config` and
run the command `npm publish`, it'll upload a new version into the registry with the updated version from
the `package.json`.

⚠ Note that you can extend and customize the config above as shown in the
official [documentation](https://prettier.io/docs/en/configuration.html#sharing-configurations).
