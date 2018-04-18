const gulpset = require("./../../gulpset");
const gulp = require("gulp");
const $ = require("gulp-load-plugins")();

gulpset.confs.jsdoc = {
  src: [`${gulpset.paths.src}**/*.jsx`],
  dest: `${gulpset.paths.docs}jsdoc/`
};

gulpset.tasks.jsdoc = conf => {
  conf = conf || gulpset.confs.jsdoc || {};
  return gulp
    .src(conf.src, { read: false })
    .pipe($.plumber())
    .pipe(
      $.jsdoc({
        opts: {
          destination: conf.dest
        }
      })
    );
};

// @verbose
gulpset.gulp.task("jsdoc", () => jsdoc());
