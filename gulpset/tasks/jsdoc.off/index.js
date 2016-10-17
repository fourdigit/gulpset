var gulpset = require("./../../gulpset");


// @verbose
gulpset.gulp.task("jsdoc",	function() { return gulpset.tasks.jsdoc(); });


gulpset.confs.jsdoc = {
	src: [gulpset.paths.src + "**/*.jsx"],
	dest: gulpset.paths.docs + "jsdoc/"
};



//----------------------------------------------------------------------------------------------------
///
var gulp = require("gulp");
var plumber = require("gulp-plumber");
var jsdoc = require("gulp-jsdoc3");

gulpset.tasks.jsdoc = function(conf) {
	conf = conf || gulpset.confs.jsdoc || {};
	return gulp.src(conf.src, {read: false})
		.pipe(plumber())
		.pipe(jsdoc({
			opts: {
				destination: conf.dest
			}
		}));
};
