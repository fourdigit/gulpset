const gulpset = require("./../../gulpset");
const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const autoprefixer = require("autoprefixer");

gulpset.confs.cleancss = {
  src: [`${gulpset.paths.src}**/*.css`],
  dest: gulpset.paths.dest
};

const cleancss = (doMinify, browsers, renameRule, conf) => {
  if (doMinify === undefined) doMinify = false;
  conf = conf || gulpset.confs.cleancss || {};
  conf.browsers = conf.browsers || ["last 3 versions"];
  if (browsers) conf.browsers = browsers;

  var options = {};
  if (doMinify) options.outputStyle = "compressed";

  return gulp
    .src(conf.src)
    .pipe($.plumber())
    .pipe($.if(doMinify !== true, sourcemaps.init()))
    .pipe($.cleancss())
    .pipe($.postcss([autoprefixer()]))
    .pipe($.if(doMinify !== true, $.sourcemaps.write("./")))
    .pipe($.if(renameRule !== undefined, $.rename(renameRule)))
    .pipe(gulp.dest(conf.dest))
    .pipe(
      gulpset.stream({
        match: "**/*.css"
      })
    );
};

// @verbose
gulpset.gulp.task("cleancss", () => cleancss(false));

// @verbose
gulpset.gulp.task("cleancss-minify", () => cleancss(true));
