#!/usr/bin/env node
/* eslint-disable no-console */
const commander = require('commander');
const crossSpawn = require('cross-spawn');
const path = require('path');
const colors = require('ansi-colors');
const fs = require('fs-extra');
const os = require('os');
const validateProjectName = require('validate-npm-package-name');

const cwd = process.cwd();
let newPrjRootPath; // Root path of the new project
const pkgRootPath = path.resolve(__dirname, '..');
let projectName;

const packageJson = require(path.join(pkgRootPath, 'package.json'));

// Parse command
const program = new commander.Command(packageJson.name)
  .version(packageJson.version)
  .arguments('<project-directory>')
  .usage(`${colors.green('<project-directory>')}`)
  .action(name => {
    projectName = name;
  })
  .parse(process.argv);

const handleExit = () => {
  console.log('Exiting without error.');
  process.exit();
};

const handleError = e => {
  console.error(colors.red('ERROR! An error was encountered while executing'));
  console.error(e);
  console.log(colors.red('Exiting with error.'));
  process.exit(1);
};

process.on('SIGINT', handleExit);
process.on('uncaughtException', handleError);

/**
 * Validate command arguments
 *
 */
function validateArgs() {
  if (typeof projectName === 'undefined') {
    console.error('Please specify the project directory:');
    console.log(`  ${colors.cyan(program.name())} ${colors.green('<project-directory>')}`);
    console.log();
    console.log('For example:');
    console.log(`  ${colors.cyan(program.name())} ${colors.green('my-gulpset-project')}`);
    console.log();
    process.exit(1);
  }
}

/**
 * Print warnings and errors to console
 *
 * @param {Array<string>} results array of warning and error messages
 */
function printValidationResults(results) {
  if (typeof results !== 'undefined') {
    results.forEach(error => {
      console.error(colors.red(`  *  ${error}`));
    });
  }
}

/**
 * Validate project name
 * Exit with code 1 if name is invalid
 *
 * @param {string} name name of the project
 * @param {Array<string>} dependencies list of dependencies of `create-gulpset-skeleton`
 */
function checkProjectName(name, dependencies) {
  // Validate project name against NPM naming restriction
  // https://github.com/npm/cli/blob/latest/doc/files/package.json.md#name
  const validationResult = validateProjectName(name);
  if (!validationResult.validForNewPackages) {
    console.error(`Could not create a project called ${colors.red(`"${name}"`)} because of npm naming restrictions:`);
    printValidationResults(validationResult.errors);
    printValidationResults(validationResult.warnings);
    process.exit(1);
  }

  // Check if project name conflicts with existing NPM packages
  if (dependencies.indexOf(name) >= 0) {
    console.error(
      colors.red(`We cannot create a project called `) +
        colors.green(name) +
        colors.red(
          ` because a dependency with the same name exists.\n` +
            `Due to the way npm works, the following names are not allowed:\n\n`
        ) +
        colors.cyan(dependencies.map(depName => `  ${depName}`).join('\n')) +
        colors.red('\n\nPlease choose a different project name.')
    );
    process.exit(1);
  }
}

/**
 * Validate the path of the to-be-created-project
 *
 * @param {string} projectName
 */
function checkProjectPath(projectName) {
  const pathOfNewPrj = path.join(cwd, projectName);
  if (fs.existsSync(pathOfNewPrj) && fs.readdirSync(pathOfNewPrj).length > 0) {
    console.error(
      `ERROR! Directory ${projectName} already exist and it's not empty. Please remove it before proceeding.`
    );
    process.exit(1);
  }
}

/**
 * Generate the `package.json` file for the new project
 *
 * @param {string} prjName name of the new project
 * @returns new package.json object
 */
function generatePackageJson(prjName) {
  const newPkgJson = {};
  const dependencies = ['@fourdigit/sanitize-4d.css', '@fourdigit/scss-utilities'];

  newPkgJson.name = prjName;
  newPkgJson.version = '0.1.0';
  newPkgJson.description = '';
  newPkgJson.main = packageJson.main;
  newPkgJson.scripts = packageJson.scripts;
  newPkgJson.devDependencies = packageJson.devDependencies;
  newPkgJson.dependencies = {};
  dependencies.forEach(depName => {
    newPkgJson.dependencies[depName] = packageJson.dependencies[depName];
  });

  return newPkgJson;
}

/**
 * Create new project `name` using `gulpset-skeleton`
 *
 * @param {string} name
 */
function createApp(name) {
  const root = path.resolve(name);
  const appName = path.basename(root);

  checkProjectName(appName, [...Object.keys(packageJson.dependencies), ...Object.keys(packageJson.devDependencies)]);

  checkProjectPath(name);

  newPrjRootPath = path.join(cwd, name);

  fs.ensureDirSync(name);

  console.log(`Creating a new gulpset project in ${colors.green(root)}.\n`);

  // Copy core files and templates
  const filesToCopy = [
    '.gitignore',
    '.browserslistrc',
    '.editorconfig',
    '.eslintignore',
    '.eslintrc',
    '.prettierignore',
    '.prettierrc.js',
    '.stylelintrc.js',
    '.travis.yml',
    'bitbucket-pipelines.yml',
    'doczrc.js',
    'gulpfile.js',
    'tsconfig.json',
    'webpack.config.js',
    'webpack.config.jsx.js',
    'webpack.config.prod.js',
    'yarn.lock'
  ];
  const directoriesToCopy = ['.vscode', 'gulpset', 'src'];
  const bootstrapAssetsPath = 'bootstrap/assets';

  for (let i = 0; i < directoriesToCopy.length; i++) {
    const srcDirPath = path.join(pkgRootPath, directoriesToCopy[i]);
    const dstDirPath = path.join(newPrjRootPath, directoriesToCopy[i]);
    fs.copySync(srcDirPath, dstDirPath);
  }

  // Copy files to root directory of created project
  fs.readdirSync(path.join(pkgRootPath, bootstrapAssetsPath)).forEach(filename => {
    const srcDirPath = path.join(pkgRootPath, bootstrapAssetsPath, filename);
    const dstDirPath = path.join(newPrjRootPath, filename);
    fs.copySync(srcDirPath, dstDirPath);
  });

  for (let i = 0; i < filesToCopy.length; i++) {
    const srcFilePath = path.join(pkgRootPath, filesToCopy[i]);
    const dstFilePath = path.join(newPrjRootPath, filesToCopy[i]);
    fs.copyFileSync(srcFilePath, dstFilePath);
  }

  // Create new `package.json`
  const newPkgJson = generatePackageJson(name);
  fs.writeFileSync(path.join(newPrjRootPath, 'package.json'), JSON.stringify(newPkgJson, null, 2) + os.EOL);

  crossSpawn.sync('yarn', ['install', '--cwd', newPrjRootPath], {
    stdio: 'inherit'
  });

  console.log(`Success! Created ${appName} at ${path.join(root)}`);
}

validateArgs();
createApp(projectName);
