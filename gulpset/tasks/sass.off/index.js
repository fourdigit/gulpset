const gulpset = require("./../../gulpset");
const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const autoprefixer = require("autoprefixer");

gulpset.confs.sass = {
  src: [`${gulpset.paths.src}**/*.{scss,sass}`],
  dest: gulpset.paths.dest
};

gulpset.tasks.sass = (doMinify, browsers, conf) => {
  if (doMinify === undefined) doMinify = false;
  conf = conf || gulpset.confs.sass || {};
  conf.browsers = conf.browsers || ["last 3 versions"];
  if (browsers) conf.browsers = browsers;

  let options = {};
  if (doMinify) options.outputStyle = "compressed";

  return gulp
    .src(conf.src)
    .pipe($.plumber())
    .pipe($.if(doMinify !== true, $.sourcemaps.init()))
    .pipe($.sass(options).on("error", sass.logError))
    .pipe($.postcss([autoprefixer()]))
    .pipe($.if(doMinify !== true, $.sourcemaps.write("./")))
    .pipe(gulp.dest(conf.dest))
    .pipe(gulpset.stream({ match: "**/*.css" }));
};

// @verbose
gulpset.gulp.task("sass", () => sass(false));

// @verbose
gulpset.gulp.task("sass-minify", () => sass(true));
