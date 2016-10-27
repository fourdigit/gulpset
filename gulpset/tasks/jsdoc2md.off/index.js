var gulpset = require("./../../gulpset");


// @verbose
gulpset.gulp.task("jsdoc2md",	function() { return gulpset.tasks.jsdoc2md(); });


gulpset.confs.jsdoc2md = {
	src: [gulpset.paths.src + "**/*.jsx"],
	dest: gulpset.paths.docs + "jsdoc/",
	destFile: "doc.md"
};



//----------------------------------------------------------------------------------------------------
///
var gulp = require("gulp");
var plumber = require("gulp-plumber");
var gulpJsdoc2md = require("gulp-jsdoc-to-markdown");
var concat = require("gulp-concat");

gulpset.tasks.jsdoc2md = function(conf) {
	conf = conf || gulpset.confs.jsdoc2md || {};
	return gulp.src(conf.src)
		.pipe(concat(conf.destFile))
		.pipe(gulpJsdoc2md({"no-gfm": false}))
		.pipe(gulp.dest(conf.dest));
};
