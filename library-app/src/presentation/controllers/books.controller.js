const CreateBookUseCase = require( "../../domain/ports/in/book/use-case/create-book.use-case" );
const EditBookUseCase = require( "../../domain/ports/in/book/use-case/edit-book.use-case" );
const GetBookUseCase = require( "../../domain/ports/in/book/use-case/get-book.use-case" )
const RemoveBookUseCase = require( "../../domain/ports/in/book/use-case/remove-book.use-case" );

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
    const { id } = req.params
    return this.#getBooksUseCase.getBookByID(id);
  }

  async getBookList(req) {
    const pagination = req.query;
    return this.#getBooksUseCase.getBooksList(pagination);
  }

  async editBookByID(req) {
    const [book, id] = [req.body, req.params.id];
    return this.#editBookUseCase.editBookByID(id, book);
  }

  async removeBookByID(req) {
    const id = req.params.id;
    return this.#removeBookUseCase.removeBookByID(id);
  }

  async createBook(req) {
    const book = req.body;
    return this.#createBookUseCase.createBook(book);
  }
}

module.exports = BooksController;
