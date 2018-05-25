var gulpset = require("./../../gulpset");


// @verbose
gulpset.gulp.task("browserify", function (cb) { gulpset.tasks.browserify(cb); });
// @verbose
gulpset.gulp.task("browserify-watch", function (cb) { gulpset.tasks.browserify(cb, true, false); });
// @verbose
gulpset.gulp.task("browserify-minify", function (cb) { gulpset.tasks.browserify(cb, false, true); });


gulpset.confs.browserify = [{
  src: gulpset.paths.src + "**/*.js",
  dest: gulpset.paths.dest,
  file: "dest.js",
  vendor: false
}];



//----------------------------------------------------------------------------------------------------
///
var gulp = require("gulp");
var plumber = require("gulp-plumber");
var gulpif = require("gulp-if");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var transform = require("vinyl-transform");
var es = require("event-stream");
var browserify = require("browserify");
var watchify = require("watchify");
var envify = require("envify");
var licensify = require("licensify");
var uglify = require("gulp-uglify");
var optimizejs = require("gulp-optimize-js");
var sourcemaps = require("gulp-sourcemaps");
var prettyHrtime = require("pretty-hrtime");
var colors = require("ansi-colors");
var log = require("fancy-log");



gulpset.tasks.browserify = function (cb, doWatch, doMinify, doLicensify, conf) {
  doWatch = doWatch === true;
  doMinify = doMinify === true;
  doLicensify = doLicensify === true;
  conf = conf || gulpset.confs.browserify || [];

  var streams = conf.map(function(entry, i) {
    var opts = {
      entries: [entry.src],
      debug: !doMinify,
      plugin: []
    };

    if(doWatch) opts.plugin.push(watchify);
    if(doLicensify) opts.plugin.push(licensify);

    var b = browserify(opts);
    b.transform(envify);
    if(doWatch) {
      b.on("update", function(id) {
        log("Browserify update: " + id);
        bundle();
      });
    }

    var bundle = function() {
      log("Starting", "'" + colors.cyan("bundle") + "'", "file " + colors.magenta(entry.file), "...");
      var startTime = process.hrtime();
      return b.bundle(function(err) {
        var elapsedTime = prettyHrtime(process.hrtime(startTime));
        if(err) {
          log("Finished", "'" + colors.cyan("bundle") + "'", "file " + colors.magenta(entry.file), colors.red("error"));
          log(err.toString());
          if(err.codeFrame) {
            log("-------------------------");
            log(err.codeFrame);
            log("-------------------------");
          }
        } else {
          log("Finished", "'" + colors.cyan("bundle") + "'", "file " + colors.magenta(entry.file), "after", colors.magenta(elapsedTime));
        }

      })
        .pipe(plumber())
        .pipe(source(entry.file))
        .pipe(buffer())
        .pipe(gulpif(!doMinify, sourcemaps.init({ loadMaps: true })))
        .pipe(gulpif(doMinify, uglify({
          compress: {
            negate_iife: false
          }
        })))
        .pipe(gulpif(doMinify, optimizejs()))
        .pipe(gulpif(!doMinify, sourcemaps.write("./")))
        .pipe(gulp.dest(entry.dest))
        .pipe(gulpset.stream({ match: '**/*.js' }));
    };

    return bundle();
  });
  es.merge(streams).on("end", function() {
    cb();
  });
};
