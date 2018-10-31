const gulpset = require('./gulpset/gulpset');

gulpset.gulp.task(
  'default',
  gulpset.gulp.series(
    'clean',
    gulpset.gulp.parallel(
      'copy',
      'sasslint',
      'eslint',
      'imagemin',
      'sass',
      'scripts',
      'ejs',
      'jsx',
      'styleguide'
    ),
    'watch',
    'browsersync'
  )
);


gulpset.gulp.task(
  'production',
  gulpset.gulp.series(
    'clean',
    gulpset.gulp.parallel(
      'copy',
      'sasslint',
      'eslint',
      'imagemin',
      'sass-minify',
      'scripts-minify',
      'ejs',
      'jsx',
      'styleguide'
    )
  )
);
