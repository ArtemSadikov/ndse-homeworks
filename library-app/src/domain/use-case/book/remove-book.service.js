const GetBookUseCase = require( "../../ports/in/book/use-case/get-book.use-case" );
const RemoveBookUseCase = require( "../../ports/in/book/use-case/remove-book.use-case" );
const BookRepositoryPort = require( "../../ports/out/book/repository/book.repository.port" );

class RemoveBookService extends RemoveBookUseCase {
  #bookRepo = new BookRepositoryPort();
  #getBookUseCase = new GetBookUseCase();

  constructor(bookRepo, getBookUseCase) {
    super();
    this.#bookRepo = bookRepo;
    this.#getBookUseCase = getBookUseCase;
  }

  async removeBookByID(id) {
    await this.#getBookUseCase.getBookByID(id);
    return this.#bookRepo.removeBookByID(id);
  }
}

module.exports = RemoveBookService;
