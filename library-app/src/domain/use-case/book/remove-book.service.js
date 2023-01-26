const RemoveBookUseCase = require( "../../ports/in/book/use-case/remove-book.use-case" );
const BookRepositoryPort = require( "../../ports/out/book/repository/book.repository.port" );

class RemoveBookService extends RemoveBookUseCase {
  #bookRepo = new BookRepositoryPort();

  constructor(bookRepo) {
    super();
    this.#bookRepo = bookRepo
  }

  async removeBookByID(id) {
    return this.#bookRepo.removeBookByID(id);
  }
}

module.exports = RemoveBookService;
