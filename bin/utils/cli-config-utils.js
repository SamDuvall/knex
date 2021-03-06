const { DEFAULT_EXT, DEFAULT_TABLE_NAME } = require('./constants');
const { resolveClientNameWithAliases } = require('../../lib/helpers');
const fs = require('fs');
const path = require('path');
const tildify = require('tildify');
const color = require('colorette');
const argv = require('getopts')(process.argv.slice(2));

function mkConfigObj(opts) {
  if (!opts.client) {
    const path = resolveDefaultKnexfilePath();
    throw new Error(
      `No default configuration file '${path}' found and no commandline connection parameters passed`
    );
  }

  const envName = opts.env || process.env.NODE_ENV || 'development';
  const resolvedClientName = resolveClientNameWithAliases(opts.client);
  const useNullAsDefault = resolvedClientName === 'sqlite3';
  return {
    ext: DEFAULT_EXT,
    [envName]: {
      useNullAsDefault,
      client: opts.client,
      connection: opts.connection,
      migrations: {
        directory: opts.migrationsDirectory,
        tableName: opts.migrationsTableName || DEFAULT_TABLE_NAME,
      },
    },
  };
}

function resolveKnexFilePath() {
  const jsPath = resolveDefaultKnexfilePath('js');
  if (fs.existsSync(jsPath)) {
    return {
      path: jsPath,
      extension: 'js',
    };
  }

  const tsPath = resolveDefaultKnexfilePath('ts');
  if (fs.existsSync(tsPath)) {
    return {
      path: tsPath,
      extension: 'ts',
    };
  }

  console.warn(
    `Failed to find configuration at default location of ${resolveDefaultKnexfilePath(
      'js'
    )}`
  );
}

function resolveDefaultKnexfilePath(extension) {
  return process.cwd() + `/knexfile.${extension}`;
}

function resolveEnvironmentConfig(opts, allConfigs) {
  const environment = opts.env || process.env.NODE_ENV || 'development';
  const result = allConfigs[environment] || allConfigs;

  if (allConfigs[environment]) {
    console.log('Using environment:', color.magenta(environment));
  }

  if (!result) {
    console.log(color.red('Warning: unable to read knexfile config'));
    process.exit(1);
  }

  if (argv.debug !== undefined) {
    result.debug = argv.debug;
  }

  return result;
}

function exit(text) {
  if (text instanceof Error) {
    console.error(
      color.red(`${text.detail ? `${text.detail}\n` : ''}${text.stack}`)
    );
  } else {
    console.error(color.red(text));
  }
  process.exit(1);
}

function success(text) {
  console.log(text);
  process.exit(0);
}

function checkLocalModule(env) {
  if (!env.modulePath) {
    console.log(
      color.red('No local knex install found in:'),
      color.magenta(tildify(env.cwd))
    );
    exit('Try running: npm install knex');
  }
}

function getMigrationExtension(env, opts) {
  const config = resolveEnvironmentConfig(opts, env.configuration);

  let ext = DEFAULT_EXT;
  if (argv.x) {
    ext = argv.x;
  } else if (config.migrations && config.migrations.extension) {
    ext = config.migrations.extension;
  } else if (config.ext) {
    ext = config.ext;
  }
  return ext.toLowerCase();
}

function getStubPath(env, opts) {
  const config = resolveEnvironmentConfig(opts, env.configuration);
  const stubDirectory = config.migrations && config.migrations.directory;

  const { stub } = argv;
  if (!stub) {
    return null;
  } else if (stub.includes('/')) {
    // relative path to stub
    return stub;
  }

  // using stub <name> must have config.migrations.directory defined
  if (!stubDirectory) {
    console.log(color.red('Failed to load stub'), color.magenta(stub));
    exit('config.migrations.directory in knexfile must be defined');
  }

  return path.join(stubDirectory, stub);
}

module.exports = {
  mkConfigObj,
  resolveKnexFilePath,
  resolveEnvironmentConfig,
  exit,
  success,
  checkLocalModule,
  getMigrationExtension,
  getStubPath,
};
