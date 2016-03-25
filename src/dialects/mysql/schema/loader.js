
// MySQL Schema Loader
// -------
var inherits       = require('inherits');
var SchemaLoader = require('../../../schema/loader');

function SchemaLoader_MySQL(client, builder) {
  SchemaLoader.call(this, client, builder)
}
inherits(SchemaLoader_MySQL, SchemaLoader)

module.exports = SchemaLoader_MySQL;
