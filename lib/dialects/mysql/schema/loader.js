'use strict';

exports.__esModule = true;

var _inherits = require('inherits');

var _inherits2 = _interopRequireDefault(_inherits);

var _compiler = require('../../../schema/compiler');

var _compiler2 = _interopRequireDefault(_compiler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// MySQL Schema Loader
// -------
function SchemaLoader_MySQL(client, builder) {
  SchemaLoader.call(this, client, builder);
}
(0, _inherits2.default)(SchemaLoader_MySQL, SchemaLoader);

exports.default = SchemaCompiler_MySQL;
module.exports = exports['default'];