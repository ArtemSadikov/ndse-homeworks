const BaseError = require( "./base-error" );

class ValidationError extends BaseError {
  constructor(
    fieldName,
    description = 'Validation error',
  ) {
    super(fieldName, description);
  }
}

module.exports = ValidationError;
