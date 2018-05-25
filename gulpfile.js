var gulpset = require("./gulpset/gulpset");
var runSequence = require("run-sequence");




/**
 * development build + watch + browsersync
 */
gulpset.gulp.task("dev", function(cb) {
  runSequence(
    //["copy", "concat", "eslint", "stylint", "babel-watch", "stylus"],
    //"watch",
    //"browsersync",
    cb
  );
});
