const gulpset = require("./../../gulpset");
const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const sasslint = require("gulp-sass-lint");

gulpset.confs.sasslint = {
  config: "./.sass-lint.yml",
  src: [`${gulpset.paths.src}**/*.{scss,sass}`]
};

const sasslint = conf => {
  conf = conf || gulpset.confs.sasslint || {};
  return gulp
    .src(conf.src)
    .pipe($.plumber())
    .pipe(sasslint({ config: conf.config }))
    .pipe(sasslint.format());
};

// @verbose
gulpset.gulp.task("sasslint", () => sasslint());
