const gulpset = require("./../../gulpset");

// @verbose
gulpset.gulp.task("scripts", cb => gulpset.tasks.scripts(cb));

gulpset.confs.scripts = {
  src: `${gulpset.paths.src}**/*.es6`,
  dest: gulpset.paths.dest
};

//----------------------------------------------------------------------------------------------------
///
const gulp = require("gulp");
const plumber = require("gulp-plumber");
const webpack = require("webpack");
const webpackStream = require("webpack-stream");
const logger = require("gulplog");
const webpackConfig = require("../../../webpack.config.js");

gulpset.tasks.scripts = (callback, conf) => {
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
    .pipe(plumber())
    .pipe(webpackStream(webpackConfig, webpack, done))
    .pipe(gulp.dest(conf.dest))
    .pipe(gulpset.stream());
};
