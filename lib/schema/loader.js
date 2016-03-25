"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _ = require('lodash');
var Promise = require('../promise');
var exec = Promise.promisify(require('child_process').exec);

// The new migration we're performing, typically called from the `knex.schemaLoader`
// interface on the main `knex` object. Passes the `knex` instance performing
// the migration.

var SchemaLoader = (function () {
  function SchemaLoader(knex) {
    _classCallCheck(this, SchemaLoader);

    this.knex = knex;
    this.settings = knex.client.connectionSettings;
    this.config = knex.client.config.schema;
  }

  // Dump the schema from the database into a file

  // Dump the schema from the database into a file

  _createClass(SchemaLoader, [{
    key: 'dump',
    value: function dump(config) {
      config = _.extend({}, this.config, config);
      return _dump(this.settings, config.filename);
    }

    // Load the schema into the database
  }, {
    key: 'load',
    value: function load(config) {
      config = _.extend({}, this.config, config);
      return _load(this.settings, config.filename);
    }

    // Drop the current schema
  }, {
    key: 'drop',
    value: function drop(config) {
      config = _.extend({}, this.config, config);
      return _drop(this.settings);
    }

    // Create the current schema
  }, {
    key: 'create',
    value: function create(config) {
      config = _.extend({}, this.config, config);
      return _create(this.settings);
    }

    // Reset the current schema (drop, create, load)
  }, {
    key: 'reset',
    value: function reset(config) {
      var settings = this.settings;
      config = _.extend({}, this.config, config);
      return _drop(settings).then(function () {
        return _create(settings);
      }).then(function () {
        return _load(settings, config.filename);
      });
    }
  }]);

  return SchemaLoader;
})();

exports['default'] = SchemaLoader;
function _dump(settings, filename) {
  var commands = ['mysqldump', '-u' + settings.user, '--no-data', settings.database, '>', filename];
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