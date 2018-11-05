const gulpset = require('./../../gulpset');

gulpset.confs.watch = [
  {
    watch: [gulpset.paths.src + '**/*.ejs'],
    run: ['ejs', 'styleguide']
  },
  {
    watch: [gulpset.paths.src + '**/*.scss'],
    run: ['sass', 'stylelint', 'styleguide']
  },
  {
    watch: [gulpset.paths.src + '**/*.js'],
    run: ['eslint']
  }
];

//----------------------------------------------------------------------------------------------------
///
const gulp = require('gulp');

gulpset.tasks.watch = (cb, conf) => {
  conf = conf || gulpset.confs.watch || {};
  for (let i = 0, iLen = conf.length; i < iLen; i++) {
    const node = conf[i];
    gulp.watch(node.watch, gulp.series(...node.run));
  }
  cb();
};

// @verbose
gulpset.gulp.task('watch', cb => gulpset.tasks.watch(cb));
