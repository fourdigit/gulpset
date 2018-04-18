const gulpset = require("./../../gulpset");
const gulp = require("gulp");
const $ = require("gulp-load-plugins")();

/**
 * yarn add gulp-plumber gulp-changed gulp-pug gulp-posthtml posthtml-attrs-sorter gulp-prettify --dev
 */

gulpset.confs.pug = {
  entry: `${gulpset.paths.src}**/*.pug`,
  src: `${gulpset.paths.src}**/!(_)*.pug`,
  dest: gulpset.paths.dest,
  data: {}
};

const pug = (data, conf) => {
  data = data || gulpset.confs.pug.data || {};
  conf = conf || gulpset.confs.pug || {};

  return gulp
    .src(conf.src)
    .pipe($.plumber())
    .pipe($.changed(conf.dest))
    .pipe(
      $.pug({
        pretty: true
      })
    )
    .pipe(gulp.dest(conf.dest))
    .pipe(gulpset.stream());
};

// @verbose
gulpset.gulp.task("pug", () => pug());
