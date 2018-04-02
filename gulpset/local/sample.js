const gulpset = require('./../gulpset');

// set local only tasks
/*
gulpset.gulp.task("custom", () => {
	console.log(gulpset.confs.sync);
});
*/

// set local only config
/*
 gulpset.confs.sync.startPath = "/index.html";
*/

// eg) filter js file to compile
/*
gulpset.confs.babel = gulpset.confs.babel.filter((val, num) => {
	return val.file === "index.js";
});
*/
