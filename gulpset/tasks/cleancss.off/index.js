var gulpset = require("./../../gulpset");


// @verbose
gulpset.gulp.task("cleancss", function() { return gulpset.tasks.cleancss(false); });
// @verbose
gulpset.gulp.task("cleancss-minify", function() { return gulpset.tasks.cleancss(true); });


gulpset.confs.cleancss = {
  src: [gulpset.paths.src + "**/*.css"],
  dest: gulpset.paths.dest
};



//----------------------------------------------------------------------------------------------------
///
var gulp = require("gulp");
var plumber = require("gulp-plumber");
var gulpif = require("gulp-if");
var cleancss = require("gulp-clean-css");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var sourcemaps = require("gulp-sourcemaps");
var rename = require("gulp-rename");

gulpset.tasks.cleancss = function(doMinify, browsers, renameRule, conf) {
  if(doMinify === undefined) doMinify = false;
  conf = conf || gulpset.confs.cleancss || {};
  conf.browsers = conf.browsers || ["last 3 versions"];
  if(browsers) conf.browsers = browsers;

  var options = {};
  if(doMinify) options.outputStyle = "compressed";

  return gulp.src(conf.src)
    .pipe(plumber())
    .pipe(gulpif(doMinify !== true, sourcemaps.init()))
    .pipe(cleancss())
    .pipe(postcss([autoprefixer({browsers: conf.browsers})]))
    .pipe(gulpif(doMinify !== true, sourcemaps.write("./")))
    .pipe(gulpif(renameRule !== undefined, rename(renameRule)))
    .pipe(gulp.dest(conf.dest))
    .pipe(gulpset.stream({match: "**/*.css"}));
};
