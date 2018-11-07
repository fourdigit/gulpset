const proxy = require('http-proxy-middleware');
const gulpset = require('./../../gulpset');

// @verbose
gulpset.gulp.task('browsersync', cb => gulpset.tasks.browsersync(cb));

gulpset.confs.browsersync = {
  port: 3000,
  server: {
    baseDir: gulpset.paths.dest,
    directory: true,
    middleware: []
  },
  startPath: '/',
  ghostMode: false
};

//----------------------------------------------------------------------------------------------------
///
const sync = require('browser-sync');
const gutil = require('gulp-util');

gulpset.tasks.browsersync = (cb, conf) => {
  conf = conf || gulpset.confs.browsersync || {};

  // proxy to docz dev server
  // conf.server.middleware.push(proxy(['/styleguide', '/static'], {
  conf.server.middleware.push(proxy((pathanme, req) => {
    return pathanme.startsWith('/styleguide')
    || pathanme.startsWith('/static')
    || pathanme.endsWith('.hot-update.js')
    || pathanme.endsWith('.hot-update.json');
  }, {
    target: 'http://localhost:4000/',
    changeOrigin: true, // for vhosted sites, changes host header to match to target's host
    logLevel: 'error' // 'debug' | 'info' | 'warn' | 'error' | 'silent'
  }));

  if (!Array.isArray(conf)) conf = [conf];

  conf.forEach(conf => {
    const bs = sync.create();
    bs.init(conf);
    gulpset.syncs.push(bs);
  });
  gulpset.stream = opt => {
    opt = opt || null;
    const queue = gutil.noop();
    gulpset.syncs.forEach(bs => {
      queue.pipe(bs.stream(opt));
    });
    return queue;
  };

  gulpset.reload = function() {
    gulpset.syncs.forEach(function(bs) {
      bs.reload();
    });
  };

  cb();
};
