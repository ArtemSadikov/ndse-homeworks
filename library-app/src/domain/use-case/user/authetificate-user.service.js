const AuthenticateUserUseCase = require( "../../ports/in/user/use-case/authentificate-user.use-case" );

class AuthenticateUserService extends AuthenticateUserUseCase {
  async login() {
    return { id: 1, mail: 'test@mail.ru' };
  }
}

module.exports = AuthenticateUserService;
