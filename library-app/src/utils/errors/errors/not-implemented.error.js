const BaseError = require( "./base-error" );

class NotImplementedError extends BaseError {
  constructor(
    method,
    description = 'Method not implemented'
  ) {
    super(method, description);
  }
}

module.exports = NotImplementedError;
