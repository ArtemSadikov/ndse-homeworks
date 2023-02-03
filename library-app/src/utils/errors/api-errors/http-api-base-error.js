const HTTPStatusCodes = require( "../../http-status-codes/http-status-codes" );

class HTTPApiBaseError extends Error {
  #statusCode = HTTPStatusCodes.INTERNAL_SERVER_ERROR;

  constructor(name = 'Internal Server Error.', description, statusCode) {
    super(description)

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.#statusCode = statusCode;

    Error.captureStackTrace(this);
  }

  get statusCode() {
    return this.#statusCode;
  }
}

module.exports = HTTPApiBaseError;
