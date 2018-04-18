const gulpset = require("./../../gulpset");
const sync = require("browser-sync");
const gutil = require("gulp-util");

/**
 * yarn add browser-sync gulp-util --dev
 */

gulpset.confs.browsersync = {
  port: 3000,
  server: {
    baseDir: gulpset.paths.dest,
    directory: true
  },
  startPath: "/",
  ghostMode: false
};

const browsersync = (cb, conf) => {
  conf = conf || gulpset.confs.browsersync || {};
  if (!Array.isArray(conf)) conf = [conf];

  conf.forEach(conf => {
    var bs = sync.create();
    bs.init(conf);
    gulpset.syncs.push(bs);
  });
  gulpset.stream = opt => {
    opt = opt || null;
    var queue = gutil.noop();
    gulpset.syncs.forEach(bs => {
      queue.pipe(bs.stream(opt));
    });
    return queue;
  };
  cb();
};

// @verbose
gulpset.gulp.task("browsersync", cb => browsersync(cb));
