const EditBookUseCase = require( "../../ports/in/book/use-case/edit-book.use-case" );
const GetBookUseCase = require( "../../ports/in/book/use-case/get-book.use-case" );
const BookRepositoryPort = require( "../../ports/out/book/repository/book.repository.port" );

class EditBookService extends EditBookUseCase {
  #editRepo = new BookRepositoryPort();
  #getBookUseCase = new GetBookUseCase();

  constructor(editRepo, getBookUseCase) {
    super();
    this.#editRepo = editRepo;
    this.#getBookUseCase = getBookUseCase;
  }

  async editBookByID(id, book) {
    await this.#getBookUseCase.getBookByID(id);
    return this.#editRepo.editBookByID(id, book);
  }
}

module.exports = EditBookService;
