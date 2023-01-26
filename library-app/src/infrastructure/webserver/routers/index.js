const apiRouter = require('express').Router();

const booksRouter = require('./book');
const userRouter = require( './user' );

apiRouter.use('/books', booksRouter());
apiRouter.use('/user', userRouter())

module.exports = apiRouter;
