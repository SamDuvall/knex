"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _promise = require('../promise');

var _promise2 = _interopRequireDefault(_promise);

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var exec = _promise2['default'].promisify(_child_process2['default'].exec);

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

  SchemaLoader.prototype.dump = function dump(config) {
    config = _lodash2['default'].extend({}, this.config, config);
    return _dump(this.settings, config.filename);
  };

  // Load the schema into the database

  SchemaLoader.prototype.load = function load(config) {
    config = _lodash2['default'].extend({}, this.config, config);
    return _load(this.settings, config.filename);
  };

  // Drop the current schema

  SchemaLoader.prototype.drop = function drop(config) {
    config = _lodash2['default'].extend({}, this.config, config);
    return _drop(this.settings);
  };

  // Create the current schema

  SchemaLoader.prototype.create = function create(config) {
    config = _lodash2['default'].extend({}, this.config, config);
    return _create(this.settings);
  };

  // Reset the current schema (drop, create, load)

  SchemaLoader.prototype.reset = function reset(config) {
    var settings = this.settings;
    config = _lodash2['default'].extend({}, this.config, config);
    return _drop(settings).then(function () {
      return _create(settings);
    }).then(function () {
      return _load(settings, config.filename);
    });
  };

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY2hlbWEvbG9hZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7Ozs7Ozs7c0JBRUMsUUFBUTs7Ozt1QkFDRixZQUFZOzs7OzZCQUNOLGVBQWU7Ozs7QUFDekMsSUFBSSxJQUFJLEdBQUcscUJBQVEsU0FBUyxDQUFDLDJCQUFjLElBQUksQ0FBQyxDQUFDOzs7Ozs7SUFLNUIsWUFBWTtBQUVwQixXQUZRLFlBQVksQ0FFbkIsSUFBSSxFQUFFOzBCQUZDLFlBQVk7O0FBRzdCLFFBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO0FBQ2hCLFFBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQztBQUMvQyxRQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztHQUN6Qzs7Ozs7O0FBTmtCLGNBQVksV0FTL0IsSUFBSSxHQUFBLGNBQUMsTUFBTSxFQUFFO0FBQ1gsVUFBTSxHQUFHLG9CQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztBQUMzQyxXQUFPLEtBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztHQUM3Qzs7OztBQVprQixjQUFZLFdBZS9CLElBQUksR0FBQSxjQUFDLE1BQU0sRUFBRTtBQUNYLFVBQU0sR0FBRyxvQkFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDM0MsV0FBTyxLQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7R0FDN0M7Ozs7QUFsQmtCLGNBQVksV0FxQi9CLElBQUksR0FBQSxjQUFDLE1BQU0sRUFBRTtBQUNYLFVBQU0sR0FBRyxvQkFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDM0MsV0FBTyxLQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0dBQzVCOzs7O0FBeEJrQixjQUFZLFdBMkIvQixNQUFNLEdBQUEsZ0JBQUMsTUFBTSxFQUFFO0FBQ2IsVUFBTSxHQUFHLG9CQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztBQUMzQyxXQUFPLE9BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7R0FDOUI7Ozs7QUE5QmtCLGNBQVksV0FpQy9CLEtBQUssR0FBQSxlQUFDLE1BQU0sRUFBRTtBQUNaLFFBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7QUFDN0IsVUFBTSxHQUFHLG9CQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztBQUMzQyxXQUFPLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBVztBQUNwQyxhQUFPLE9BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUN6QixDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVc7QUFDakIsYUFBTyxLQUFJLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUN4QyxDQUFDLENBQUM7R0FDSjs7U0F6Q2tCLFlBQVk7OztxQkFBWixZQUFZO0FBNkNqQyxTQUFTLEtBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFO0FBQ2hDLE1BQUksUUFBUSxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxRQUFRLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNsRyxNQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2pDLFNBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0NBQ3RCOzs7QUFHRCxTQUFTLEtBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFO0FBQ2hDLE1BQUksUUFBUSxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ2pGLE1BQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDakMsU0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Q0FDdEI7OztBQUdELFNBQVMsS0FBSSxDQUFDLFFBQVEsRUFBRTtBQUN0QixNQUFJLFFBQVEsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsMkJBQTJCLEdBQUcsUUFBUSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUM3RyxNQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2pDLFNBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0NBQ3RCOzs7QUFHRCxTQUFTLE9BQU0sQ0FBQyxRQUFRLEVBQUU7QUFDeEIsTUFBSSxRQUFRLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLGlDQUFpQyxHQUFHLFFBQVEsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDbkgsTUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNqQyxTQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztDQUN0QiIsImZpbGUiOiJsb2FkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBQcm9taXNlIGZyb20gJy4uL3Byb21pc2UnO1xuaW1wb3J0IGNoaWxkX3Byb2Nlc3MgZnJvbSAnY2hpbGRfcHJvY2VzcydcbnZhciBleGVjID0gUHJvbWlzZS5wcm9taXNpZnkoY2hpbGRfcHJvY2Vzcy5leGVjKTtcblxuLy8gVGhlIG5ldyBtaWdyYXRpb24gd2UncmUgcGVyZm9ybWluZywgdHlwaWNhbGx5IGNhbGxlZCBmcm9tIHRoZSBga25leC5zY2hlbWFMb2FkZXJgXG4vLyBpbnRlcmZhY2Ugb24gdGhlIG1haW4gYGtuZXhgIG9iamVjdC4gUGFzc2VzIHRoZSBga25leGAgaW5zdGFuY2UgcGVyZm9ybWluZ1xuLy8gdGhlIG1pZ3JhdGlvbi5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjaGVtYUxvYWRlciB7XG5cbiAgY29uc3RydWN0b3Ioa25leCkge1xuICAgIHRoaXMua25leCA9IGtuZXhcbiAgICB0aGlzLnNldHRpbmdzID0ga25leC5jbGllbnQuY29ubmVjdGlvblNldHRpbmdzO1xuICAgIHRoaXMuY29uZmlnID0ga25leC5jbGllbnQuY29uZmlnLnNjaGVtYTtcbiAgfVxuXG4gIC8vIER1bXAgdGhlIHNjaGVtYSBmcm9tIHRoZSBkYXRhYmFzZSBpbnRvIGEgZmlsZVxuICBkdW1wKGNvbmZpZykge1xuICAgIGNvbmZpZyA9IF8uZXh0ZW5kKHt9LCB0aGlzLmNvbmZpZywgY29uZmlnKTtcbiAgICByZXR1cm4gZHVtcCh0aGlzLnNldHRpbmdzLCBjb25maWcuZmlsZW5hbWUpO1xuICB9XG5cbiAgLy8gTG9hZCB0aGUgc2NoZW1hIGludG8gdGhlIGRhdGFiYXNlXG4gIGxvYWQoY29uZmlnKSB7XG4gICAgY29uZmlnID0gXy5leHRlbmQoe30sIHRoaXMuY29uZmlnLCBjb25maWcpO1xuICAgIHJldHVybiBsb2FkKHRoaXMuc2V0dGluZ3MsIGNvbmZpZy5maWxlbmFtZSk7XG4gIH1cblxuICAvLyBEcm9wIHRoZSBjdXJyZW50IHNjaGVtYVxuICBkcm9wKGNvbmZpZykge1xuICAgIGNvbmZpZyA9IF8uZXh0ZW5kKHt9LCB0aGlzLmNvbmZpZywgY29uZmlnKTtcbiAgICByZXR1cm4gZHJvcCh0aGlzLnNldHRpbmdzKTtcbiAgfVxuXG4gIC8vIENyZWF0ZSB0aGUgY3VycmVudCBzY2hlbWFcbiAgY3JlYXRlKGNvbmZpZykge1xuICAgIGNvbmZpZyA9IF8uZXh0ZW5kKHt9LCB0aGlzLmNvbmZpZywgY29uZmlnKTtcbiAgICByZXR1cm4gY3JlYXRlKHRoaXMuc2V0dGluZ3MpO1xuICB9XG5cbiAgLy8gUmVzZXQgdGhlIGN1cnJlbnQgc2NoZW1hIChkcm9wLCBjcmVhdGUsIGxvYWQpXG4gIHJlc2V0KGNvbmZpZykge1xuICAgIHZhciBzZXR0aW5ncyA9IHRoaXMuc2V0dGluZ3M7XG4gICAgY29uZmlnID0gXy5leHRlbmQoe30sIHRoaXMuY29uZmlnLCBjb25maWcpO1xuICAgIHJldHVybiBkcm9wKHNldHRpbmdzKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGNyZWF0ZShzZXR0aW5ncyk7XG4gICAgfSkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBsb2FkKHNldHRpbmdzLCBjb25maWcuZmlsZW5hbWUpO1xuICAgIH0pO1xuICB9XG59XG5cbi8vIER1bXAgdGhlIHNjaGVtYSBmcm9tIHRoZSBkYXRhYmFzZSBpbnRvIGEgZmlsZVxuZnVuY3Rpb24gZHVtcChzZXR0aW5ncywgZmlsZW5hbWUpIHtcbiAgdmFyIGNvbW1hbmRzID0gWydteXNxbGR1bXAnLCAnLXUnICsgc2V0dGluZ3MudXNlciwgJy0tbm8tZGF0YScsIHNldHRpbmdzLmRhdGFiYXNlLCAnPicsIGZpbGVuYW1lXTtcbiAgdmFyIGNvbW1hbmQgPSBjb21tYW5kcy5qb2luKCcgJyk7XG4gIHJldHVybiBleGVjKGNvbW1hbmQpO1xufVxuXG4vLyBMb2FkIHRoZSBzY2hlbWEgaW50byB0aGUgZGF0YWJhc2VcbmZ1bmN0aW9uIGxvYWQoc2V0dGluZ3MsIGZpbGVuYW1lKSB7XG4gIHZhciBjb21tYW5kcyA9IFsnbXlzcWwnLCAnLXUnICsgc2V0dGluZ3MudXNlciwgc2V0dGluZ3MuZGF0YWJhc2UsICc8JywgZmlsZW5hbWVdO1xuICB2YXIgY29tbWFuZCA9IGNvbW1hbmRzLmpvaW4oJyAnKTtcbiAgcmV0dXJuIGV4ZWMoY29tbWFuZCk7XG59XG5cbi8vIERyb3AgdGhlIGN1cnJlbnQgc2NoZW1hXG5mdW5jdGlvbiBkcm9wKHNldHRpbmdzKSB7XG4gIHZhciBjb21tYW5kcyA9IFsnbXlzcWwnLCAnLXUnICsgc2V0dGluZ3MudXNlciwgJy1lJywgJ1wiRFJPUCBEQVRBQkFTRSBJRiBFWElTVFMgJyArIHNldHRpbmdzLmRhdGFiYXNlICsgJztcIiddO1xuICB2YXIgY29tbWFuZCA9IGNvbW1hbmRzLmpvaW4oJyAnKTtcbiAgcmV0dXJuIGV4ZWMoY29tbWFuZCk7XG59XG5cbi8vIENyZWF0ZSB0aGUgY3VycmVudCBzY2hlbWFcbmZ1bmN0aW9uIGNyZWF0ZShzZXR0aW5ncykge1xuICB2YXIgY29tbWFuZHMgPSBbJ215c3FsJywgJy11JyArIHNldHRpbmdzLnVzZXIsICctZScsICdcIkNSRUFURSBEQVRBQkFTRSBJRiBOT1QgRVhJU1RTICcgKyBzZXR0aW5ncy5kYXRhYmFzZSArICc7XCInXTtcbiAgdmFyIGNvbW1hbmQgPSBjb21tYW5kcy5qb2luKCcgJyk7XG4gIHJldHVybiBleGVjKGNvbW1hbmQpO1xufVxuIl19