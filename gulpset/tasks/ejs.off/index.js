var gulpset = require("./../../gulpset");


// @verbose
gulpset.gulp.task("ejs", function() { return gulpset.tasks.ejs(); });


gulpset.confs.ejs = {
  src: [gulpset.paths.src + "**/*.html"],
  dest: gulpset.paths.dest,
  data: {},
  options: {
    root: process.cwd()
  },
  settings: {
    ext: ".html"
  }
};



//----------------------------------------------------------------------------------------------------
///
var gulp = require("gulp");
var plumber = require("gulp-plumber");
var ejs = require("gulp-ejs");
var changed = require("gulp-changed");
var beautify = require("gulp-jsbeautifier");


gulpset.tasks.ejs = function(data, options, settings, conf) {
  data = data || gulpset.confs.ejs.data || {};
  options = options || gulpset.confs.ejs.options || {};
  settings = settings || gulpset.confs.ejs.settings || {};
  conf = conf || gulpset.confs.ejs || {};

  return gulp.src(conf.src)
    .pipe(plumber())
    .pipe(changed(conf.dest))
    .pipe(ejs(data, options, settings))
    .pipe(beautify({indentSize: 2}))
    .pipe(gulp.dest(conf.dest))
    .pipe(gulpset.stream());
};
