
// MySQL Schema Loader
// -------
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _inherits = require('inherits');

var _inherits2 = _interopRequireDefault(_inherits);

var _schemaCompiler = require('../../../schema/compiler');

var _schemaCompiler2 = _interopRequireDefault(_schemaCompiler);

function SchemaLoader_MySQL(client, builder) {
  SchemaLoader.call(this, client, builder);
}
_inherits2['default'](SchemaLoader_MySQL, SchemaLoader);

module.exports = SchemaLoader_MySQL;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kaWFsZWN0cy9teXNxbC9zY2hlbWEvbG9hZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7d0JBR3FCLFVBQVU7Ozs7OEJBQ0osMEJBQTBCOzs7O0FBRXJELFNBQVMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRTtBQUMzQyxjQUFZLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUE7Q0FDekM7QUFDRCxzQkFBUyxrQkFBa0IsRUFBRSxZQUFZLENBQUMsQ0FBQTs7QUFFMUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyIsImZpbGUiOiJsb2FkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8vIE15U1FMIFNjaGVtYSBMb2FkZXJcbi8vIC0tLS0tLS1cbmltcG9ydCBpbmhlcml0cyBmcm9tICdpbmhlcml0cyc7XG5pbXBvcnQgU2NoZW1hQ29tcGlsZXIgZnJvbSAnLi4vLi4vLi4vc2NoZW1hL2NvbXBpbGVyJztcblxuZnVuY3Rpb24gU2NoZW1hTG9hZGVyX015U1FMKGNsaWVudCwgYnVpbGRlcikge1xuICBTY2hlbWFMb2FkZXIuY2FsbCh0aGlzLCBjbGllbnQsIGJ1aWxkZXIpXG59XG5pbmhlcml0cyhTY2hlbWFMb2FkZXJfTXlTUUwsIFNjaGVtYUxvYWRlcilcblxubW9kdWxlLmV4cG9ydHMgPSBTY2hlbWFMb2FkZXJfTXlTUUw7XG4iXX0=