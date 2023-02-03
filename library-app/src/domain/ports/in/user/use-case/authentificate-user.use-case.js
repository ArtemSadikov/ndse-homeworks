const NotImplementedError = require( "../../../../../utils/errors/errors/not-implemented.error" );

class AuthenticateUserUseCase {
  async login() {
    throw new NotImplementedError('login');
  }
}

module.exports = AuthenticateUserUseCase;
