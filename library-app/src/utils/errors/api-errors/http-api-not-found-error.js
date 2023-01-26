const HTTPStatusCodes = require( "../../http-status-codes/http-status-codes" );
const HTTPApiBaseError = require( "./http-api-base-error" );

class HTTPApiNotFoundError extends HTTPApiBaseError {
  constructor(
    name,
    description = 'Not found',
    statusCode = HTTPStatusCodes.NOT_FOUND,
  ) {
    super(name, description, statusCode);
  }
}

module.exports = HTTPApiNotFoundError;
