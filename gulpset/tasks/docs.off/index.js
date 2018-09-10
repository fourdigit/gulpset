const gulpset = require('./../../gulpset');

// @verbose
gulpset.gulp.task('docs', () => gulpset.tasks.docs());

gulpset.confs.docs = {
  src: `${gulpset.paths.src}**/*.md`,
  dest: gulpset.paths.dest
};

//----------------------------------------------------------------------------------------------------
///
const gulp = require('gulp');
const frontMatter = require('gulp-front-matter');
const markdown = require('gulp-markdown');
const layout = require('gulp-layout');

gulpset.tasks.docs = conf => {
  const config = conf || gulpset.confs.docs || {};
  return gulp
    .src(config.src)
    .pipe(
      frontMatter({
        remove: true
      })
    )
    .pipe(markdown())
    .pipe(layout(file => file.frontMatter))
    .pipe(gulp.dest(config.dest))
    .pipe(gulpset.stream());
};
