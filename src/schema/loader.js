"use strict";

import _ from 'lodash';
import Promise from '../promise';
import child_process from 'child_process'
var exec = Promise.promisify(child_process.exec);

// The new migration we're performing, typically called from the `knex.schemaLoader`
// interface on the main `knex` object. Passes the `knex` instance performing
// the migration.
export default class SchemaLoader {

  constructor(knex) {
    this.knex = knex
    this.settings = knex.client.connectionSettings;
    this.config = knex.client.config.schema;
  }

  // Dump the schema from the database into a file
  dump(config) {
    config = _.extend({}, this.config, config);
    return dump(this.settings, config.filename);
  }

  // Load the schema into the database
  load(config) {
    config = _.extend({}, this.config, config);
    return load(this.settings, config.filename);
  }

  // Drop the current schema
  drop(config) {
    config = _.extend({}, this.config, config);
    return drop(this.settings);
  }

  // Create the current schema
  create(config) {
    config = _.extend({}, this.config, config);
    return create(this.settings);
  }

  // Reset the current schema (drop, create, load)
  reset(config) {
    var settings = this.settings;
    config = _.extend({}, this.config, config);
    return drop(settings).then(function() {
      return create(settings);
    }).then(function() {
      return load(settings, config.filename);
    });
  }
}

// Dump the schema from the database into a file
function dump(settings, filename) {
  var commands = ['mysqldump', '-u' + settings.user, '--no-data', settings.database, '>', filename];
  var command = commands.join(' ');
  return exec(command);
}

// Load the schema into the database
function load(settings, filename) {
  var commands = ['mysql', '-u' + settings.user, settings.database, '<', filename];
  var command = commands.join(' ');
  return exec(command);
}

// Drop the current schema
function drop(settings) {
  var commands = ['mysql', '-u' + settings.user, '-e', '"DROP DATABASE IF EXISTS ' + settings.database + ';"'];
  var command = commands.join(' ');
  return exec(command);
}

// Create the current schema
function create(settings) {
  var commands = ['mysql', '-u' + settings.user, '-e', '"CREATE DATABASE IF NOT EXISTS ' + settings.database + ';"'];
  var command = commands.join(' ');
  return exec(command);
}
