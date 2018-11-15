#!/usr/bin/env node
/* eslint-disable no-console */
const cp = require('child_process');
const path = require('path');
const colors = require('ansi-colors');
const fs = require('fs-extra');

const cwd = process.cwd();
const pkgRootPath = path.resolve(__dirname, '../..');

const packageJson = require(path.join(pkgRootPath, 'package.json'));
// eslint-disable-next-line no-magic-numbers
const additionalArgs = require('minimist')(process.argv.slice(2))._;

const handleExit = () => {
  console.log('Exiting without error.');
  process.exit();
};

const handleError = e => {
  console.error('ERROR! An error was encountered while executing');
  console.error(e);
  console.log('Exiting with error.');
  process.exit(1);
};

process.on('SIGINT', handleExit);
process.on('uncaughtException', handleError);

function validateArgs(args) {
  const prjName = args.length ? args[0] : undefined;
  if (!prjName) {
    console.error('Please specify the project name.');
    process.exit(1);
  }
}

/**
 * Validate app name
 * Exit with code 1 if name is invalid
 *
 * @param {string} name name of the app
 * @param {Array<string>} dependencies list of dependencies of `create-gulpset-skeleton`
 */
function checkAppName(name, dependencies) {
  // TODO: validate package name base on npm naming rules
  // https://github.com/npm/cli/blob/latest/doc/files/package.json.md#name
}

/**
 * Create new project `name` using `gulpset-skeleton`
 *
 * @param {*} name
 */
function createApp(name) {
  const root = path.resolve(name);
  const appName = path.basename(root);

  checkAppName(appName, [...Object.keys(packageJson.dependencies), ...Object.keys(packageJson.devDependencies)]);

  const pathOfNewPrj = path.join(cwd, name);
  if (fs.existsSync(pathOfNewPrj) && fs.readdirSync(pathOfNewPrj).length > 0) {
    console.error(`ERROR! Directory ${name} already exist and it's not empty. Please remove it before proceeding.`);
    process.exit(1);
  }
  fs.ensureDirSync(name);

  // TODO: use `fs.readdirSync` to list files and directories
  const filesToCopy = [
    'README.md',
    'aigis_config.yml',
    'gulpfile.js',
    'package.json',
    'webpack.config.js',
    'webpack.config.prod.js'
  ];
  const directoriesToCopy = ['gulpset', 'src'];

  for (let i = 0; i < filesToCopy.length; i++) {
    const srcFilePath = path.join(pkgRootPath, filesToCopy[i]);
    const dstFilePath = path.join(cwd, name, filesToCopy[i]);
    fs.copyFileSync(srcFilePath, dstFilePath);
  }

  for (let i = 0; i < directoriesToCopy.length; i++) {
    const srcDirPath = path.join(pkgRootPath, directoriesToCopy[i]);
    const dstDirPath = path.join(cwd, name, directoriesToCopy[i]);
    fs.copySync(srcDirPath, dstDirPath);
  }

  // TODO: run `yarn install`
}

validateArgs(additionalArgs);
const prjName = additionalArgs[0];
createApp(prjName);
