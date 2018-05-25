var gulpset = require("./../../gulpset");


// @verbose
gulpset.gulp.task("clean", function () { return gulpset.tasks.clean(); });



//----------------------------------------------------------------------------------------------------
///
var del = require("del");

gulpset.tasks.clean = function (path) {
  path = path || gulpset.paths.dest;
  return del(path + "/**/*");
};
