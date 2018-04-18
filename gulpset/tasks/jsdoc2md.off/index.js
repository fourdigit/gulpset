const gulpset = require("./../../gulpset");
const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const gulpJsdoc2md = require("gulp-jsdoc-to-markdown");

gulpset.confs.jsdoc2md = {
  src: [`${gulpset.paths.src}**/*.jsx`],
  dest: `${gulpset.paths.docs}jsdoc/`,
  destFile: "doc.md"
};

const jsdoc2md = conf => {
  conf = conf || gulpset.confs.jsdoc2md || {};
  return gulp
    .src(conf.src)
    .pipe($.concat(conf.destFile))
    .pipe(gulpJsdoc2md({ "no-gfm": false }))
    .pipe(gulp.dest(conf.dest));
};

// @verbose
gulpset.gulp.task("jsdoc2md", () => jsdoc2md());
