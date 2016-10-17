var gulpset = require("./../../gulpset");


// @verbose
gulpset.gulp.task("generator",	function(cb) { return gulpset.tasks.generator(cb); });


gulpset.confs.generator = {
	data: "./generator/data.csv"
};



//----------------------------------------------------------------------------------------------------
///
var fs = require("fs");
var gulp = require("gulp");
var plumber = require("gulp-plumber");
var template = require("gulp-template");
var iconv = require("iconv-lite");
var csv = require("fast-csv");
var rename = require("gulp-rename");

gulpset.tasks.generator = function(cb, conf) {
	conf = conf || gulpset.confs.generator || {};
	var fileContent = iconv.decode(fs.readFileSync(conf.data), "shift_jis").replace(/(\r\n|\r|\n)/ig, "\n");
	var options = {
		"imports": {
			"nl2br": function(str) {
				return str.replace(/\n/ig, "<br />\n");
			},
			"escapehtml": function(str) {
				return str
					.replace(/&/g, "&amp;")
					.replace(/</g, "&lt;")
					.replace(/>/g, "&gt;")
					.replace(/"/g, "&quot;")
					.replace(/'/g, "&#039;");
			},
			"escapeurl": encodeURIComponent
		}
	};
	csv.fromString(fileContent, {headers: true})
		.on("data", function(data) {
			var tmpl = data.template;
			var dest = data.destination;
			delete data.template;
			delete data.destination;
			gulp.src(tmpl)
				.pipe(plumber())
				.pipe(template(data, options))
				.pipe(rename(dest))
				.pipe(gulp.dest("./"));
		})
		.on("end", function() {
			cb();
		});
};
