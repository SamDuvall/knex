'use strict';

const child_process = require('child_process');

const exec = (command) =>
  new Promise(function(resolve, reject) {
    child_process.exec(command, (error, stdout) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(stdout.trim());
    });
  });

// The new migration we're performing, typically called from the `knex.schemaLoader`
// interface on the main `knex` object. Passes the `knex` instance performing
// the migration.
class SchemaLoader {
  constructor(knex) {
    this.knex = knex;
    this.settings = knex.client.connectionSettings;
    this.config = knex.client.config.schema;
  }

  // Dump the schema from the database into a file
  dump(config) {
    config = { ...this.config, ...config };
    return dump(this.settings, config.filename);
  }

  // Load the schema into the database
  load(config) {
    config = { ...this.config, ...config };
    return load(this.settings, config.filename);
  }

  // Drop the current schema
  drop(config) {
    config = { ...this.config, ...config };
    return drop(this.settings);
  }

  // Create the current schema
  create(config) {
    config = { ...this.config, ...config };
    return create(this.settings);
  }

  // Reset the current schema (drop, create, load)
  reset(config) {
    var settings = this.settings;
    config = { ...this.config, ...config };
    return drop(settings)
      .then(function() {
        return create(settings);
      })
      .then(function() {
        return load(settings, config.filename);
      });
  }
}

// Database
function getDbParams(settings) {
  const { host, password, user } = settings;
  return [user && `-u${user}`, host && `-h${host}`, password && `-p${password}`]
    .filter(Boolean)
    .join(' ');
}

// Dump the schema from the database into a file
function dump(settings, filename) {
  // Dump the schema from the DB
  const { database } = settings;
  const dbParams = getDbParams(settings);
  return exec(
    `mysqldump ${dbParams} --no-data --routines ${database} | sed "s/DEFINER=[^ ]* / /" > ${filename}`
  );
}

// Load the schema into the database
function load(settings, filename) {
  const { database } = settings;
  const dbParams = getDbParams(settings);
  return exec(`mysql ${dbParams} ${database} < ${filename}`);
}

// Drop the current schema
function drop(settings) {
  const { database } = settings;
  const dbParams = getDbParams(settings);
  return exec(`mysql ${dbParams} -e "DROP DATABASE IF EXISTS ${database};"`);
}

// Create the current schema
function create(settings) {
  const { database } = settings;
  const dbParams = getDbParams(settings);
  return exec(
    `mysql ${dbParams} -e "CREATE DATABASE IF NOT EXISTS ${database};"`
  );
}

module.exports = SchemaLoader;
