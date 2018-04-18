const gulpset = require("./../../gulpset");
const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const webpack = require("webpack");
const webpackStream = require("webpack-stream");
const logger = require("gulplog");
const webpackConfig = require("../../../webpack.config.js");

/**
 * yarn add webpack webpack-cli webpack-stream gulplog babel-core babel-loader babel-preset-env --dev
 */

gulpset.confs.scripts = {
  src: `${gulpset.paths.src}**/*.es6`,
  dest: gulpset.paths.dest
};

const scripts = (callback, conf) => {
  conf = conf || gulpset.confs.scripts || {};
  let firstBuildReady = false;

  function done(err, stats) {
    firstBuildReady = true;

    if (err) {
      // hard error, see https://webpack.github.io/docs/node.js-api.html#error-handling
      return; // emit('error', err) in webpack-stream
    }

    // https://webpack.js.org/api/node/#stats-object
    // https://webpack.js.org/configuration/stats/
    logger[stats.hasErrors() ? "error" : "info"](
      stats.toString({
        chunks: false, // Makes the build much quieter
        modules: false,
        colors: true // Shows colors in the console
      })
    );
  }

  // const config = conf || gulpset.confs.scripts || {};
  return gulp
    .src(conf.src)
    .pipe($.plumber())
    .pipe(webpackStream(webpackConfig, webpack, done))
    .pipe(gulp.dest(conf.dest))
    .pipe(gulpset.stream());
};

// @verbose
gulpset.gulp.task("scripts", () => scripts());
