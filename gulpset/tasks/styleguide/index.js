const gulpset = require('./../../gulpset');

// // @verbose
gulpset.gulp.task('styleguide', () => gulpset.tasks.styleguide('dev'));
gulpset.gulp.task('styleguide:prod', cb => gulpset.tasks.styleguide('prod', cb));

const { commands, args: defaultArgs } = require('docz-core');
const execDevCommand = async args => commands.dev(args);
const execBuildCommand = async args => commands.build(args);

gulpset.tasks.styleguide = (mod, cb) => {
  const Config = {};
  const fakeYargs = {
    positional: (key, opt) => {
      Config[key] = opt.default;
    }
  };
  // https://github.com/pedronauck/docz/blob/be94b0e/packages/docz-core/src/commands/args.ts#L96
  defaultArgs(mod === 'dev' ? 'development' : 'production')(fakeYargs);

  if (mod === 'dev') return execDevCommand(Config);

  return execBuildCommand(Config).then(
    () => {
      if (cb) cb();
      process.exit(0);
    },
    reason => {
      // eslint-disable-next-line no-console
      console.error('`styleguide` build FAILED!');
      // eslint-disable-next-line no-console
      console.error(reason);
      if (cb) cb();
      process.exit(1);
    }
  );
};
