const gulpset = require("./../../gulpset");

// @verbose
gulpset.gulp.task("cleancss", () => gulp.tasks.cleancss(false));

// @verbose
gulpset.gulp.task("cleancss-minify", () => gulp.tasks.cleancss(true));

gulpset.confs.cleancss = {
  src: [`${gulpset.paths.src}**/*.css`],
  dest: gulpset.paths.dest
};

//----------------------------------------------------------------------------------------------------
///
const gulp = require("gulp");
const plumber = require("gulp-plumber");
const gulpif = require("gulp-if");
const cleancss = require("gulp-cleancss");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

gulp.tasks.cleancss = (doMinify, browsers, renameRule, conf) => {
  if (doMinify === undefined) doMinify = false;
  conf = conf || gulpset.confs.cleancss || {};
  conf.browsers = conf.browsers || ["last 3 versions"];
  if (browsers) conf.browsers = browsers;

  var options = {};
  if (doMinify) options.outputStyle = "compressed";

  return gulp
    .src(conf.src)
    .pipe(plumber())
    .pipe(cleancss())
    .pipe(postcss([autoprefixer()]))
    .pipe(gulpifif(doMinify !== true, $.sourcemaps.write("./")))
    .pipe(gulpif(renameRule !== undefined, $.rename(renameRule)))
    .pipe(gulp.dest(conf.dest))
    .pipe(
      gulpset.stream({
        match: "**/*.css"
      })
    );
};
