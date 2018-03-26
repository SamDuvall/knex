"use strict";

exports.__esModule = true;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var exec = _bluebird2.default.promisify(_child_process2.default.exec);

// The new migration we're performing, typically called from the `knex.schemaLoader`
// interface on the main `knex` object. Passes the `knex` instance performing
// the migration.

var SchemaLoader = function () {
  function SchemaLoader(knex) {
    (0, _classCallCheck3.default)(this, SchemaLoader);

    this.knex = knex;
    this.settings = knex.client.connectionSettings;
    this.config = knex.client.config.schema;
  }

  // Dump the schema from the database into a file


  SchemaLoader.prototype.dump = function dump(config) {
    config = (0, _assign2.default)({}, this.config, config);
    return _dump(this.settings, config.filename);
  };

  // Load the schema into the database


  SchemaLoader.prototype.load = function load(config) {
    config = (0, _assign2.default)({}, this.config, config);
    return _load(this.settings, config.filename);
  };

  // Drop the current schema


  SchemaLoader.prototype.drop = function drop(config) {
    config = (0, _assign2.default)({}, this.config, config);
    return _drop(this.settings);
  };

  // Create the current schema


  SchemaLoader.prototype.create = function create(config) {
    config = (0, _assign2.default)({}, this.config, config);
    return _create(this.settings);
  };

  // Reset the current schema (drop, create, load)


  SchemaLoader.prototype.reset = function reset(config) {
    var settings = this.settings;
    config = (0, _assign2.default)({}, this.config, config);
    return _drop(settings).then(function () {
      return _create(settings);
    }).then(function () {
      return _load(settings, config.filename);
    });
  };

  return SchemaLoader;
}();

// Dump the schema from the database into a file


exports.default = SchemaLoader;
function _dump(settings, filename) {
  var commands = ['mysqldump', '-u' + settings.user, '--no-data', '--routines', settings.database, '>', filename];
  var command = commands.join(' ');
  return exec(command);
}

// Load the schema into the database
function _load(settings, filename) {
  var commands = ['mysql', '-u' + settings.user, settings.database, '<', filename];
  var command = commands.join(' ');
  return exec(command);
}

// Drop the current schema
function _drop(settings) {
  var commands = ['mysql', '-u' + settings.user, '-e', '"DROP DATABASE IF EXISTS ' + settings.database + ';"'];
  var command = commands.join(' ');
  return exec(command);
}

// Create the current schema
function _create(settings) {
  var commands = ['mysql', '-u' + settings.user, '-e', '"CREATE DATABASE IF NOT EXISTS ' + settings.database + ';"'];
  var command = commands.join(' ');
  return exec(command);
}
module.exports = exports['default'];