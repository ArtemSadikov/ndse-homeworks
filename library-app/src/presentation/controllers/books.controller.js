const NotFoundError = require( "../../utils/errors/errors/not-found.error" );
const CreateBookUseCase = require( "../../domain/ports/in/book/use-case/create-book.use-case" );
const EditBookUseCase = require( "../../domain/ports/in/book/use-case/edit-book.use-case" );
const GetBookUseCase = require( "../../domain/ports/in/book/use-case/get-book.use-case" )
const RemoveBookUseCase = require( "../../domain/ports/in/book/use-case/remove-book.use-case" );
const HTTPApiNotFoundError = require( "../../utils/errors/api-errors/http-api-not-found-error" );
const HTTPApiBaseError = require( "../../utils/errors/api-errors/http-api-base-error" );
const HTTPStatusCodes = require( "../../utils/http-status-codes/http-status-codes" );
const getPagination = require( "../../utils/pagination/pagination" );

class BooksController {
  #getBooksUseCase = new GetBookUseCase()
  #editBookUseCase = new EditBookUseCase();
  #removeBookUseCase = new RemoveBookUseCase();
  #createBookUseCase = new CreateBookUseCase();

  constructor(getBooksService, editBookUseCase, removeBookUseCase, createBookUseCase) {
    this.#getBooksUseCase = getBooksService;
    this.#editBookUseCase = editBookUseCase;
    this.#removeBookUseCase = removeBookUseCase;
    this.#createBookUseCase = createBookUseCase;
  }

  async getBookByID(req) {
    try {
      const { id } = req.params
      const res = await this.#getBooksUseCase.getBookByID(id);
      return res;
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new HTTPApiNotFoundError(err.name);
      }

      throw new HTTPApiBaseError(err.name, err.message, HTTPStatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async getBookList(req) {
    const pagination = getPagination(req.query);
    return this.#getBooksUseCase.getBooksList(pagination);
  }

  async editBookByID(req) {
    try {
      const [book, id] = [req.body, req.params.id];
      const res = await this.#editBookUseCase.editBookByID(id, book);
      return res;
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new HTTPApiNotFoundError(err.name);
      }

      throw new HTTPApiBaseError(err.name, err.message, HTTPStatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async removeBookByID(req) {
    try {
      const id = req.params.id;
      const result = await this.#removeBookUseCase.removeBookByID(id);
      if (!result) {
        throw new Error('Failed to delete book');
      }
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new HTTPApiNotFoundError(err.name);
      }

      throw new HTTPApiBaseError(err.name, err.message, HTTPStatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async createBook(req) {
    const book = req.body;
    return this.#createBookUseCase.createBook(book);
  }
}

module.exports = BooksController;
