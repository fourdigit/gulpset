const gulpset = require('./../../gulpset');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const logger = require('gulplog');
const webpackConfig = require('../../../webpack.config');
const webpackConfigProd = require('../../../webpack.config.prod');

// @verbose
gulpset.gulp.task('scripts', cb => gulpset.tasks.scripts(cb));
gulpset.gulp.task('scripts-minify', cb => gulpset.tasks.scripts(cb, true));

gulpset.confs.scripts = {
  src: `${gulpset.paths.src}**/*.{js,jsx}`,
  dest: gulpset.paths.dest
};

gulpset.tasks.scripts = (callback, minify = false) => {
  const conf = gulpset.confs.scripts || {};
  let firstBuildReady = false;

  const done = function(err, stats) {
    if (!firstBuildReady) {
      callback();
    }
    firstBuildReady = true;

    if (err) {
      // hard error, see https://webpack.github.io/docs/node.js-api.html#error-handling
      return; // emit('error', err) in webpack-stream
    }

    // https://webpack.js.org/api/node/#stats-object
    // https://webpack.js.org/configuration/stats/
    logger[stats.hasErrors() ? 'error' : 'info'](
      stats.toString({
        chunks: false, // Makes the build much quieter
        modules: false,
        colors: true // Shows colors in the console
      })
    );

    if (typeof gulpset.reload === 'function') {
      gulpset.reload();
    }
  };

  // const config = conf || gulpset.confs.scripts || {};
  return gulp
    .src(conf.src)
    .pipe(plumber())
    .pipe(webpackStream(!minify ? webpackConfig : webpackConfigProd, webpack, done))
    .pipe(gulp.dest(conf.dest));
};
