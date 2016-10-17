// imports
var gulp = require("gulp-task-doc");
var glob = require("glob");

// gulpset
module.exports = {
	gulp: gulp,
	paths: {},
	tasks: {},
	confs: {}
};

// load tasks
var tasks = glob.sync(__dirname + "/tasks/!(*.off)/*.js");
tasks.forEach(function(val) { require(val); });

// load config
require("./config");

// load local settings
var locals = glob.sync(__dirname + "/local/*.js");
locals.forEach(function(val) { require(val); });

// @internal
gulp.task("default", gulp.help());
