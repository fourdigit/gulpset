const gulpset = require("./../../gulpset");

// @verbose
gulpset.gulp.task("clean", () => gulpset.task.clean());

//----------------------------------------------------------------------------------------------------
//

const del = require("del");

gulpset.task.clean = path => {
  path = path || gulpset.paths.dest;
  return del(path);
};
