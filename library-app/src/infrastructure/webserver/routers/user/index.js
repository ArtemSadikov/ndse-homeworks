const router = require('express').Router();

const AuthenticateUserService = require( '../../../../domain/use-case/user/authetificate-user.service' );
const UsersController = require( '../../../../presentation/controllers/users.controller' );
const useRoute = require('../../utils/use-route');

function userRouter() {
  const authenticateUserService = new AuthenticateUserService();
  const userController = new UsersController(authenticateUserService);

  router.post('/login', useRoute(userController.login.bind(userController)));

  return router;
}

module.exports = userRouter;
