const gulpset = require("./../../gulpset");

// @verbose
gulpset.gulp.task("jsdoc", () => gulpset.tasks.jsdoc());

gulpset.confs.jsdoc = {
  src: [gulpset.paths.src + "**/*.jsx"],
  dest: gulpset.paths.docs + "jsdoc/"
};

//----------------------------------------------------------------------------------------------------
///
const gulp = require("gulp");
const plumber = require("gulp-plumber");
const jsdoc = require("gulp-jsdoc3");

gulpset.tasks.jsdoc = function(conf) {
  conf = conf || gulpset.confs.jsdoc || {};
  return gulp
    .src(conf.src, { read: false })
    .pipe(plumber())
    .pipe(
      jsdoc({
        opts: {
          destination: conf.dest
        }
      })
    );
};
