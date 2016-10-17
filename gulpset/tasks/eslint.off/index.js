var gulpset = require("./../../gulpset");


// @verbose
gulpset.gulp.task("eslint",	function() { return gulpset.tasks.eslint(); });


gulpset.confs.eslint = {
	src: [gulpset.paths.src + "**/*.jsx"]
};



//----------------------------------------------------------------------------------------------------
///
var gulp = require("gulp");
var plumber = require("gulp-plumber");
var eslint = require("gulp-eslint");

gulpset.tasks.eslint = function(conf) {
	conf = conf || gulpset.confs.eslint || {};
	return gulp.src(conf.src)
		.pipe(plumber())
		.pipe(eslint())
		.pipe(eslint.format());
};
