var gulpset = require("./../../gulpset");


// @verbose
gulpset.gulp.task("watch",	function(cb) { gulpset.tasks.watch(cb); });


gulpset.confs.watch = [{
	watch: "",
	run: [""]
}];



//----------------------------------------------------------------------------------------------------
///
var gulp = require("gulp");

gulpset.tasks.watch = function(cb, conf) {
	conf = conf || gulpset.confs.watch || {};
	for(var i = 0, iLen = conf.length; i < iLen; i++) {
		var node = conf[i];
		gulp.watch(node.watch, node.run);
	}
	cb();
};
