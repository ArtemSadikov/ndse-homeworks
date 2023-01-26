const router = require('express').Router();

const useRoute = require('../utils/use-route');

const GetBookService = require( '../../../domain/use-case/book/get-book.service' );
const BooksController = require( '../../../presentation/controllers/books.controller' );
const BookMemoryRepository = require( '../../database/memory/book.memory.repository' );
const EditBookService = require( '../../../domain/use-case/book/edit-book.service' );
const RemoveBookService = require( '../../../domain/use-case/book/remove-book.service' );
const CreateBookService = require( '../../../domain/use-case/book/create-book.service' );


const bookRouter = function() {
  const bookRepo = new BookMemoryRepository();
  const getBookService = new GetBookService(bookRepo);
  const editBookService = new EditBookService(bookRepo, getBookService);
  const removeBookService = new RemoveBookService(bookRepo);
  const createBookService = new CreateBookService(bookRepo);
  const bookController = new BooksController(getBookService, editBookService, removeBookService, createBookService);

  router.get('/:id', useRoute(bookController.getBookByID.bind(bookController)))
  router.get('/', useRoute(bookController.getBookList.bind(bookController)))

  router.put('/:id', useRoute(bookController.editBookByID.bind(bookController)));

  router.delete('/:id', useRoute(bookController.removeBookByID.bind(bookController)));

  router.post('/', useRoute(bookController.createBook.bind(bookController)));

  return router;
}

module.exports = bookRouter;
