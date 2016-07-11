'use strict';

exports.__esModule = true;
exports['default'] = makeKnex;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _events = require('events');

var _migrate = require('../migrate');

var _migrate2 = _interopRequireDefault(_migrate);

var _seed = require('../seed');

var _seed2 = _interopRequireDefault(_seed);

var _functionhelper = require('../functionhelper');

var _functionhelper2 = _interopRequireDefault(_functionhelper);

var _schemaLoader = require('../schema/loader');

var _schemaLoader2 = _interopRequireDefault(_schemaLoader);

var _queryMethods = require('../query/methods');

var _queryMethods2 = _interopRequireDefault(_queryMethods);

var _helpers = require('../helpers');

var helpers = _interopRequireWildcard(_helpers);

var _lodash = require('lodash');

var _batchInsert = require('./batchInsert');

var _batchInsert2 = _interopRequireDefault(_batchInsert);

function makeKnex(client) {

  // The object we're potentially using to kick off an initial chain.
  function knex(tableName) {
    var qb = knex.queryBuilder();
    if (!tableName) helpers.warn('calling knex without a tableName is deprecated. Use knex.queryBuilder() instead.');
    return tableName ? qb.table(tableName) : qb;
  }

  _lodash.assign(knex, {

    Promise: require('../promise'),

    // A new query builder instance.
    queryBuilder: function queryBuilder() {
      return client.queryBuilder();
    },

    raw: function raw() {
      return client.raw.apply(client, arguments);
    },

    batchInsert: function batchInsert(table, batch) {
      var chunkSize = arguments.length <= 2 || arguments[2] === undefined ? 1000 : arguments[2];

      return new _batchInsert2['default'](this, table, batch, chunkSize);
    },

    // Runs a new transaction, taking a container and returning a promise
    // for when the transaction is resolved.
    transaction: function transaction(container, config) {
      return client.transaction(container, config);
    },

    // Typically never needed, initializes the pool for a knex client.
    initialize: function initialize(config) {
      return client.initialize(config);
    },

    // Convenience method for tearing down the pool.
    destroy: function destroy(callback) {
      return client.destroy(callback);
    }

  });

  // The `__knex__` is used if you need to duck-type check whether this
  // is a knex builder, without a full on `instanceof` check.
  knex.VERSION = knex.__knex__ = require('../../package.json').version;

  // Hook up the "knex" object as an EventEmitter.
  var ee = new _events.EventEmitter();
  for (var key in ee) {
    knex[key] = ee[key];
  }

  // Allow chaining methods from the root object, before
  // any other information is specified.
  _queryMethods2['default'].forEach(function (method) {
    knex[method] = function () {
      var builder = knex.queryBuilder();
      return builder[method].apply(builder, arguments);
    };
  });

  knex.client = client;

  Object.defineProperties(knex, {

    schema: {
      get: function get() {
        return client.schemaBuilder();
      }
    },

    schemaLoader: {
      get: function get() {
        return new _schemaLoader2['default'](knex);
      }
    },

    migrate: {
      get: function get() {
        return new _migrate2['default'](knex);
      }
    },

    seed: {
      get: function get() {
        return new _seed2['default'](knex);
      }
    },

    fn: {
      get: function get() {
        return new _functionhelper2['default'](client);
      }
    }

  });

  // Passthrough all "start" and "query" events to the knex object.
  client.on('start', function (obj) {
    knex.emit('start', obj);
  });

  client.on('query', function (obj) {
    knex.emit('query', obj);
  });

  client.on('query-error', function (err, obj) {
    knex.emit('query-error', err, obj);
  });

  client.on('query-response', function (response, obj, builder) {
    knex.emit('query-response', response, obj, builder);
  });

  client.makeKnex = makeKnex;

  return knex;
}

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL21ha2Uta25leC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7cUJBWXdCLFFBQVE7Ozs7OztzQkFYSCxRQUFROzt1QkFFaEIsWUFBWTs7OztvQkFDZCxTQUFTOzs7OzhCQUNELG1CQUFtQjs7Ozs0QkFDckIsa0JBQWtCOzs7OzRCQUNoQixrQkFBa0I7Ozs7dUJBQ3BCLFlBQVk7O0lBQXpCLE9BQU87O3NCQUNJLFFBQVE7OzJCQUNQLGVBQWU7Ozs7QUFFeEIsU0FBUyxRQUFRLENBQUMsTUFBTSxFQUFFOzs7QUFHdkMsV0FBUyxJQUFJLENBQUMsU0FBUyxFQUFFO0FBQ3ZCLFFBQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTtBQUM5QixRQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQzFCLGtGQUFrRixDQUNuRixDQUFDO0FBQ0YsV0FBTyxTQUFTLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUE7R0FDNUM7O0FBRUQsaUJBQU8sSUFBSSxFQUFFOztBQUVYLFdBQU8sRUFBRSxPQUFPLENBQUMsWUFBWSxDQUFDOzs7QUFHOUIsZ0JBQVksRUFBQSx3QkFBRztBQUNiLGFBQU8sTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFBO0tBQzdCOztBQUVELE9BQUcsRUFBQSxlQUFHO0FBQ0osYUFBTyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUE7S0FDM0M7O0FBRUQsZUFBVyxFQUFBLHFCQUFDLEtBQUssRUFBRSxLQUFLLEVBQW9CO1VBQWxCLFNBQVMseURBQUcsSUFBSTs7QUFDeEMsYUFBTyw2QkFBZ0IsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7S0FDdkQ7Ozs7QUFJRCxlQUFXLEVBQUEscUJBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRTtBQUM3QixhQUFPLE1BQU0sQ0FB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cG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ2V2ZW50cyc7XG5cbmltcG9ydCBNaWdyYXRvciBmcm9tICcuLi9taWdyYXRlJztcbmltcG9ydCBTZWVkZXIgZnJvbSAnLi4vc2VlZCc7XG5pbXBvcnQgRnVuY3Rpb25IZWxwZXIgZnJvbSAnLi4vZnVuY3Rpb25oZWxwZXInO1xuaW1wb3J0IFNjaGVtYUxvYWRlciBmcm9tICcuLi9zY2hlbWEvbG9hZGVyJztcbmltcG9ydCBRdWVyeUludGVyZmFjZSBmcm9tICcuLi9xdWVyeS9tZXRob2RzJztcbmltcG9ydCAqIGFzIGhlbHBlcnMgZnJvbSAnLi4vaGVscGVycyc7XG5pbXBvcnQgeyBhc3NpZ24gfSBmcm9tICdsb2Rhc2gnXG5pbXBvcnQgQmF0Y2hJbnNlcnQgZnJvbSAnLi9iYXRjaEluc2VydCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1ha2VLbmV4KGNsaWVudCkge1xuXG4gIC8vIFRoZSBvYmplY3Qgd2UncmUgcG90ZW50aWFsbHkgdXNpbmcgdG8ga2ljayBvZmYgYW4gaW5pdGlhbCBjaGFpbi5cbiAgZnVuY3Rpb24ga25leCh0YWJsZU5hbWUpIHtcbiAgICBjb25zdCBxYiA9IGtuZXgucXVlcnlCdWlsZGVyKClcbiAgICBpZiAoIXRhYmxlTmFtZSkgaGVscGVycy53YXJuKFxuICAgICAgJ2NhbGxpbmcga25leCB3aXRob3V0IGEgdGFibGVOYW1lIGlzIGRlcHJlY2F0ZWQuIFVzZSBrbmV4LnF1ZXJ5QnVpbGRlcigpIGluc3RlYWQuJ1xuICAgICk7XG4gICAgcmV0dXJuIHRhYmxlTmFtZSA/IHFiLnRhYmxlKHRhYmxlTmFtZSkgOiBxYlxuICB9XG5cbiAgYXNzaWduKGtuZXgsIHtcblxuICAgIFByb21pc2U6IHJlcXVpcmUoJy4uL3Byb21pc2UnKSxcblxuICAgIC8vIEEgbmV3IHF1ZXJ5IGJ1aWxkZXIgaW5zdGFuY2UuXG4gICAgcXVlcnlCdWlsZGVyKCkge1xuICAgICAgcmV0dXJuIGNsaWVudC5xdWVyeUJ1aWxkZXIoKVxuICAgIH0sXG5cbiAgICByYXcoKSB7XG4gICAgICByZXR1cm4gY2xpZW50LnJhdy5hcHBseShjbGllbnQsIGFyZ3VtZW50cylcbiAgICB9LFxuXG4gICAgYmF0Y2hJbnNlcnQodGFibGUsIGJhdGNoLCBjaHVua1NpemUgPSAxMDAwKSB7XG4gICAgICByZXR1cm4gbmV3IEJhdGNoSW5zZXJ0KHRoaXMsIHRhYmxlLCBiYXRjaCwgY2h1bmtTaXplKTtcbiAgICB9LFxuXG4gICAgLy8gUnVucyBhIG5ldyB0cmFuc2FjdGlvbiwgdGFraW5nIGEgY29udGFpbmVyIGFuZCByZXR1cm5pbmcgYSBwcm9taXNlXG4gICAgLy8gZm9yIHdoZW4gdGhlIHRyYW5zYWN0aW9uIGlzIHJlc29sdmVkLlxuICAgIHRyYW5zYWN0aW9uKGNvbnRhaW5lciwgY29uZmlnKSB7XG4gICAgICByZXR1cm4gY2xpZW50LnRyYW5zYWN0aW9uKGNvbnRhaW5lciwgY29uZmlnKVxuICAgIH0sXG5cbiAgICAvLyBUeXBpY2FsbHkgbmV2ZXIgbmVlZGVkLCBpbml0aWFsaXplcyB0aGUgcG9vbCBmb3IgYSBrbmV4IGNsaWVudC5cbiAgICBpbml0aWFsaXplKGNvbmZpZykge1xuICAgICAgcmV0dXJuIGNsaWVudC5pbml0aWFsaXplKGNvbmZpZylcbiAgICB9LFxuXG4gICAgLy8gQ29udmVuaWVuY2UgbWV0aG9kIGZvciB0ZWFyaW5nIGRvd24gdGhlIHBvb2wuXG4gICAgZGVzdHJveShjYWxsYmFjaykge1xuICAgICAgcmV0dXJuIGNsaWVudC5kZXN0cm95KGNhbGxiYWNrKVxuICAgIH1cblxuICB9KVxuXG4gIC8vIFRoZSBgX19rbmV4X19gIGlzIHVzZWQgaWYgeW91IG5lZWQgdG8gZHVjay10eXBlIGNoZWNrIHdoZXRoZXIgdGhpc1xuICAvLyBpcyBhIGtuZXggYnVpbGRlciwgd2l0aG91dCBhIGZ1bGwgb24gYGluc3RhbmNlb2ZgIGNoZWNrLlxuICBrbmV4LlZFUlNJT04gPSBrbmV4Ll9fa25leF9fID0gcmVxdWlyZSgnLi4vLi4vcGFja2FnZS5qc29uJykudmVyc2lvbjtcblxuICAvLyBIb29rIHVwIHRoZSBcImtuZXhcIiBvYmplY3QgYXMgYW4gRXZlbnRFbWl0dGVyLlxuICBjb25zdCBlZSA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuICBmb3IgKGNvbnN0IGtleSBpbiBlZSkge1xuICAgIGtuZXhba2V5XSA9IGVlW2tleV1cbiAgfVxuXG4gIC8vIEFsbG93IGNoYWluaW5nIG1ldGhvZHMgZnJvbSB0aGUgcm9vdCBvYmplY3QsIGJlZm9yZVxuICAvLyBhbnkgb3RoZXIgaW5mb3JtYXRpb24gaXMgc3BlY2lmaWVkLlxuICBRdWVyeUludGVyZmFjZS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgIGtuZXhbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgY29uc3QgYnVpbGRlciA9IGtuZXgucXVlcnlCdWlsZGVyKClcbiAgICAgIHJldHVybiBidWlsZGVyW21ldGhvZF0uYXBwbHkoYnVpbGRlciwgYXJndW1lbnRzKVxuICAgIH1cbiAgfSlcblxuICBrbmV4LmNsaWVudCA9IGNsaWVudFxuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGtuZXgsIHtcblxuICAgIHNjaGVtYToge1xuICAgICAgZ2V0KCkge1xuICAgICAgICByZXR1cm4gY2xpZW50LnNjaGVtYUJ1aWxkZXIoKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzY2hlbWFMb2FkZXI6IHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgU2NoZW1hTG9hZGVyKGtuZXgpXG4gICAgICB9XG4gICAgfSxcblxuICAgIG1pZ3JhdGU6IHtcbiAgICAgIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNaWdyYXRvcihrbmV4KVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzZWVkOiB7XG4gICAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgU2VlZGVyKGtuZXgpXG4gICAgICB9XG4gICAgfSxcblxuICAgIGZuOiB7XG4gICAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgRnVuY3Rpb25IZWxwZXIoY2xpZW50KVxuICAgICAgfVxuICAgIH1cblxuICB9KVxuXG4gIC8vIFBhc3N0aHJvdWdoIGFsbCBcInN0YXJ0XCIgYW5kIFwicXVlcnlcIiBldmVudHMgdG8gdGhlIGtuZXggb2JqZWN0LlxuICBjbGllbnQub24oJ3N0YXJ0JywgZnVuY3Rpb24ob2JqKSB7XG4gICAga25leC5lbWl0KCdzdGFydCcsIG9iailcbiAgfSlcblxuICBjbGllbnQub24oJ3F1ZXJ5JywgZnVuY3Rpb24ob2JqKSB7XG4gICAga25leC5lbWl0KCdxdWVyeScsIG9iailcbiAgfSlcblxuICBjbGllbnQub24oJ3F1ZXJ5LWVycm9yJywgZnVuY3Rpb24oZXJyLCBvYmopIHtcbiAgICBrbmV4LmVtaXQoJ3F1ZXJ5LWVycm9yJywgZXJyLCBvYmopXG4gIH0pXG5cbiAgY2xpZW50Lm9uKCdxdWVyeS1yZXNwb25zZScsIGZ1bmN0aW9uKHJlc3BvbnNlLCBvYmosIGJ1aWxkZXIpIHtcbiAgICBrbmV4LmVtaXQoJ3F1ZXJ5LXJlc3BvbnNlJywgcmVzcG9uc2UsIG9iaiwgYnVpbGRlcilcbiAgfSlcblxuICBjbGllbnQubWFrZUtuZXggPSBtYWtlS25leFxuXG4gIHJldHVybiBrbmV4XG59XG4iXX0=