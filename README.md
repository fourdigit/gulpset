# gulpset

[![Greenkeeper badge](https://badges.greenkeeper.io/fourdigit/gulpset.svg)](https://greenkeeper.io/)

Gulp based project skeleton with modular tasks.

## want to develop

1. download this repo
2. `yarn`
3. `yarn start`

## want to generate production build(minified)

1. `yarn build:prod`

## each tasks

### js settings

- see `/webpack.config.js`, `/webpack.config.prod.js` & `/gulpset/tasks/scripts/index.js`
- Want to use es5? Do following steps.
  - `/.eslintrc`: modify `@fourdigit/eslint-config-fourdigit/esnext` => `@fourdigit/eslint-config-fourdigit/base`
  - modify `copy` task
  - remove `scripts` task from `gulpfile.js`

### scss settings

- see `/gulpset/tasks/scss/index.js`
- some utility scss libs are loaded on `/src/assets/css/app.scss`

### ejs settings

- see `/gulpset/tasks/ejs/index.js`
- some utility functions are included here `/src/_utils.ejs`
