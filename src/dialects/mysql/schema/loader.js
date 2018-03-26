
// MySQL Schema Loader
// -------
import inherits from 'inherits';
import SchemaCompiler from '../../../schema/compiler';

function SchemaLoader_MySQL(client, builder) {
  SchemaLoader.call(this, client, builder)
}
inherits(SchemaLoader_MySQL, SchemaLoader)

export default SchemaCompiler_MySQL;
