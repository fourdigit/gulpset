const gulpset = require('./gulpset/gulpset');

/**
 * development build + watch + browsersync
 */
gulpset.gulp.task(
  'default',
  gulpset.gulp.series(
    'clean',
    gulpset.gulp.parallel('copy', 'sasslint', 'imagemin', 'sass', 'scripts', 'ejs', 'styleguide'),
    'watch',
    'browsersync'
  )
);
