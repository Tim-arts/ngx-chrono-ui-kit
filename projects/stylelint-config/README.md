# Stylelint config

The current linter uses the following configs:

`stylelint-config-standard stylelint-config-standard-scss stylelint-config-prettier-scss`

#### 1) Installation

In order to install this linter you need to run these commands:

`npm i stylelint @ngx-chrono-ui-kit/stylelint-config --save-dev`

#### 2) Configuration

Then create a `.stylelintrc.js` file at the root of your project containing the following content:

```
module.exports = {
  extends: '@ngx-chrono-ui-kit/stylelint-config',
}

```

#### 3) Usage

Run the following command: `npx stylelint "**/*.scss"` to run the linter for all `scss` files

#### 4) Contributing

You may contribute and change the linter rules. To do so, navigate into the library folder with `cd stylelint-config`
and run the command `npm publish`, it'll upload a new version into the registry with the updated version from
the `package.json`.

⚠ Note that you can extend and customize the config above as shown in the
official [documentation](https://stylelint.io/user-guide/get-started#using-a-custom-syntax-directly).
