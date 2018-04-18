const gulpset = require("./../../gulpset");
const gulp = require("gulp");

gulpset.confs.watch = [
  {
    watch: "",
    run: [""]
  }
];

const watch = (cb, conf) => {
  conf = conf || gulpset.confs.watch || {};
  for (let i = 0, iLen = conf.length; i < iLen; i++) {
    const node = conf[i];
    gulp.watch(node.watch, node.run);
  }
  cb();
};

// @verbose
gulpset.gulp.task("watch", cb => {
  watch(cb);
});
