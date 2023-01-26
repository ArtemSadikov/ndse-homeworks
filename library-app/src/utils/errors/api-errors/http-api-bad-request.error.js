const HTTPStatusCodes = require( "../../http-status-codes/http-status-codes" );
const HTTPApiBaseError = require( "./http-api-base-error" );

class HTTPApiBadRequestError extends HTTPApiBaseError {
  constructor(
    field,
    description = 'Bad request',
    statusCode = HTTPStatusCodes.BAD_REQUEST,
  ) {
    super(field, description, statusCode);
  }
}

module.exports = HTTPApiBadRequestError;
