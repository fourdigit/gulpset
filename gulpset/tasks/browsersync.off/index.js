var gulpset = require("./../../gulpset");


// @verbose
gulpset.gulp.task("browsersync",	function() { gulpset.tasks.browsersync(); });


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

gulpset.tasks.browsersync = function(conf) {
	conf = conf || gulpset.confs.browsersync;
	sync(conf);
};
