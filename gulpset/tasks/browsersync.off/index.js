var gulpset = require("./../../gulpset");


// @verbose
gulpset.gulp.task("browsersync",	function(cb) { gulpset.tasks.browsersync(cb); });


gulpset.confs.browsersync = {
	port: 3000,
	server: {
		baseDir: gulpset.paths.dest,
		directory: true
	},
	startPath: "/",
	ghostMode: false
};



//----------------------------------------------------------------------------------------------------
///
var sync = require("browser-sync");
var gutil = require("gulp-util");

gulpset.tasks.browsersync = function(cb, conf) {
	conf = conf || gulpset.confs.browsersync || {};
	if(!Array.isArray(conf)) conf = [conf];

	conf.forEach(function(conf) {
		var bs = sync.create();
		bs.init(conf);
		gulpset.syncs.push(bs);
	});
	gulpset.stream = function(opt) {
		opt = opt || null;
		var queue = gutil.noop();
		gulpset.syncs.forEach(function(bs) {
			queue.pipe(bs.stream(opt));
		});
		return queue;
	};
	cb();
};
