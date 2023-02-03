const AuthenticateUserUseCase = require( "../../domain/ports/in/user/use-case/authentificate-user.use-case" );

class UsersController {
  #authenticateUserUseCase = new AuthenticateUserUseCase()
  
  constructor(
    authenticateUserUseCase
  ) {
    this.#authenticateUserUseCase = authenticateUserUseCase;
  }

  async login() {
    return this.#authenticateUserUseCase.login();
  }
}

module.exports = UsersController;
