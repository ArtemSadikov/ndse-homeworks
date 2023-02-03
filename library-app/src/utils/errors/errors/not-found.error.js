const BaseError = require( "./base-error" );

class NotFoundError extends BaseError {
  constructor(
    name,
    description = 'Not found.',
  ) {
    super(name, description);
  }
}

module.exports = NotFoundError;
