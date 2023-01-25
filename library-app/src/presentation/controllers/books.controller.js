const GetBookUseCase = require( "../../domain/ports/in/book/use-case/get-book.use-case" )
const BookMapper = require('../mappers/book.mapper');

class BooksController {
  #getBooksUseCase = new GetBookUseCase()

  constructor(getBooksService) {
    this.#getBooksUseCase = getBooksService;
  }

  async getBookByID(req) {
    const { id } = req.params
    return this.#getBooksUseCase.getBookByID(id);
  }

  async getBookList(req) {
    const pagination = req.query;
    return this.#getBooksUseCase.getBooksList(pagination);
  }
}

module.exports = BooksController;
