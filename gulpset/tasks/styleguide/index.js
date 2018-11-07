const gulpset = require('./../../gulpset');

// // @verbose
gulpset.gulp.task('styleguide', () => gulpset.tasks.styleguide('dev'));
gulpset.gulp.task('styleguide:prod', () => gulpset.tasks.styleguide('prod'));

const { commands, args: defaultArgs } = require('docz-core');
const execDevCommand = async args => commands.dev(args);
const execBuildCommand = async args => commands.build(args);

gulpset.tasks.styleguide = mod => {
  const Config = {};
  const fakeYargs = {
    positional: (key, opt) => {
      Config[key] = opt.default;
    }
  };
  // https://github.com/pedronauck/docz/blob/be94b0e/packages/docz-core/src/commands/args.ts#L96
  defaultArgs(mod === 'dev' ? 'development' : 'production')(fakeYargs);
  return mod === 'dev' ? execDevCommand(Config) : execBuildCommand(Config);
  // return execCommand(mod === 'dev' ? 'dev' : 'build')(Config);
};
