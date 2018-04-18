const gulpset = require("./../../gulpset");
const gulp = require("gulp");
const $ = require("gulp-load-plugins")();

/**
 * yarn add gulp-stylint
 */

gulpset.confs.stylint = {
  src: [`${gulpset.paths.src}**/*.styl`]
};

const stylint = conf => {
  const config = conf || gulpset.confs.stylint || {};
  return gulp
    .src(config.src)
    .pipe($.plumber())
    .pipe($.stylint())
    .pipe($.stylint.reporter());
};

// @verbose
gulpset.gulp.task("stylint", () => stylint());
