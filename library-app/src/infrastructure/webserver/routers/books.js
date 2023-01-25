const router = require('express').Router();

const useRoute = require('../utils/use-route');

const GetBookService = require( '../../../domain/use-case/book/get-book.service' );
const BooksController = require( '../../../presentation/controllers/books.controller' );
const BookMemoryRepository = require( '../../database/memory/book.memory.repository' );


const bookRouter = function() {
  const bookRepo = new BookMemoryRepository();
  const getBookService = new GetBookService(bookRepo);
  const bookController = new BooksController(getBookService);

  router.get('/:id', useRoute(bookController.getBookByID.bind(bookController)))
  router.get('/', useRoute(bookController.getBookList.bind(bookController)))

  return router;
}

module.exports = bookRouter;
