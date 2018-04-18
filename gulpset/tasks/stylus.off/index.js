const gulpset = require("./../../gulpset");
const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const autoprefixer = require("autoprefixer");

/**
 * yarn add gulp-plumber gulp-stylus gulp-if autoprefixer gulp-sourcemaps gulp-postcss --dev
 */

gulpset.confs.stylus = {
  entry: [`${gulpset.paths.src}**/*.styl`],
  src: [`${gulpset.paths.src}**/!(_)*.styl`],
  dest: gulpset.paths.dest
};

const stylus = (doMinify, browsers, conf) => {
  if (doMinify === undefined) doMinify = false;
  conf = conf || gulpset.confs.stylus || {};

  return gulp
    .src(conf.entry)
    .pipe($.plumber())
    .pipe($.if(doMinify !== true, $.sourcemaps.init()))
    .pipe(
      $.stylus({
        "include css": true
      })
    )
    .pipe($.postcss([autoprefixer()]))
    .pipe($.if(doMinify !== true, $.sourcemaps.write("./")))
    .pipe(gulp.dest(conf.dest))
    .pipe(gulpset.stream());
};

// @verbose
gulpset.gulp.task("stylus", () => stylus(false));

// @verbose
gulpset.gulp.task("stylus-minify", () => stylus(true));
