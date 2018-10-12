const gulpset = require('./../../gulpset');

// @verbose
gulpset.gulp.task('deployrsync', () => gulpset.tasks.deployrsync());

gulpset.confs.deployrsync = {
  options: {
    root: gulpset.paths.dest + '/',
    hostname: 'foobarhogehoge@54.64.182.67',
    destination: 'htdocs/',
    archive: true,
    verbose: true,
    progress: true,
    delete: true
  }
};

//----------------------------------------------------------------------------------------------------
//
const rsync = require('gulp-rsync');

gulpset.tasks.deployrsync = () => {
  return gulpset.gulp.src(gulpset.paths.dest + '/**').pipe(rsync(gulpset.confs.deployrsync.options));
};
