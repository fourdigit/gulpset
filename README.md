# gulpset

[![Greenkeeper badge](https://badges.greenkeeper.io/fourdigit/gulpset.svg)](https://greenkeeper.io/)

Gulp based project skeleton with modular tasks.

## tech stack

- gulp (task-runner)
- Webpack + babel + eslint (JS)
- Scss + PostCSS + sasslint (CSS)
- ejs (HTML)
- prettier (beatutifier)
- browser-sync (server)

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

### deployrsync settings

- see `/gulpset/tasks/deployrsync/index.js`
- set target user:hostname to `gulpset.confs.deployrsync.options.hostname`
- `gulp deployrsync` command will deploy files in build destination folder
- Want to deploy via bitbucket-pipelines?
  - enter repository settings on bitbuket web
    - Pipelines settings > Enable Pipelines
    - Environment variables > make and set `PRIVATE_KEY` (<-must encrypt!) and `TARGET_HOST`
  - built files by newly pushed `develop` branch will be deployed to `TARGET_HOST`
  - if you want to use other branches, rewrite `branches` section on `bitbucket-pipelines.yml`
