const gulpset = require("./../../gulpset");
const del = require("del");

/**
 * yarn add del --dev
 */

const clean = path => {
  path = path || gulpset.paths.dest;
  return del(path);
};

// @verbose
gulpset.gulp.task("clean", () => clean());
