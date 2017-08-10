var gulpset = require("./../../gulpset");


// @verbose
gulpset.gulp.task("ejs",	function() { return gulpset.tasks.ejs(); });


gulpset.confs.ejs = {
	src: [gulpset.paths.src + "**/*.html"],
	dest: gulpset.paths.dest,
	data: {}
};



//----------------------------------------------------------------------------------------------------
///
var gulp = require("gulp");
var plumber = require("gulp-plumber");
var ejs = require("gulp-ejs");
var changed = require("gulp-changed");

gulpset.tasks.ejs = function(data, conf) {
	data = data || gulpset.confs.ejs.data || {};
	conf = conf || gulpset.confs.ejs || {};

	return gulp.src(conf.src)
		.pipe(plumber())
		.pipe(changed(conf.dest))
		.pipe(ejs(data))
		.pipe(gulp.dest(conf.dest))
		.pipe(gulpset.stream());
};
