/**
 * @project gulpset
 * @author Nobuyuki Nishigaki <nishigaki@4digit.jp>
 * @license
 * Copyright FOURDIGIT DESIGN Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/fourdigitdesign/gulpset/blob/master/LICENSE
 */

// imports
const gulp = require("gulp-task-doc");
const glob = require("glob");
const gutil = require("gulp-util");

// gulpset
module.exports = {
  gulp: gulp,
  paths: {
    root: "./",
    src: "./src/",
    dest: "./build/",
    docs: "./docs/"
  },
  tasks: {},
  confs: {},
  syncs: [],
  stream: () => {
    return gutil.noop();
  }
};

// load tasks
const tasks = glob.sync(__dirname + "/tasks/!(*.off)/*.js");
tasks.forEach(val => {
  require(val);
});

// load config
require("./config");

// load local settings
const locals = glob.sync(__dirname + "/local/*.js");
locals.forEach(val => {
  require(val);
});

// @internal
gulp.task("default", gulp.help());
