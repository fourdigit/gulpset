const gulpset = require("./../../gulpset");
const del = require("del");

const clean = path => {
  path = path || gulpset.paths.dest;
  return del(path);
};

// @verbose
gulpset.gulp.task("clean", () => clean());
