const gulpset = require("./../../gulpset");
const gulp = require("gulp");
const frontMatter = require("gulp-front-matter");
const $ = require("gulp-load-plugins")();

/**
 * yarn add gulp-front-matter gulp-layout gulp-markdown --dev
 */

gulpset.confs.docs = {
  src: `${gulpset.paths.src}**/*.md`,
  dest: gulpset.paths.dest
};

const docs = conf => {
  const config = conf || gulpset.confs.docs || {};
  return gulp
    .src(config.src)
    .pipe(
      frontMatter({
        remove: true
      })
    )
    .pipe($.markdown())
    .pipe($.layout(file => file.frontMatter))
    .pipe(gulp.dest(config.dest))
    .pipe(gulpset.stream());
};

// @verbose
gulpset.gulp.task("docs", () => docs());
