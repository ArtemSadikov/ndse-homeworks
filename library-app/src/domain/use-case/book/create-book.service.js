const CreateBookUseCase = require( "../../ports/in/book/use-case/create-book.use-case" );
const BookRepositoryPort = require( "../../ports/out/book/repository/book.repository.port" );

class CreateBookService extends CreateBookUseCase {
  #bookRepo = new BookRepositoryPort();

  constructor(bookRepo) {
    super();
    this.#bookRepo = bookRepo;
  }

  async createBook(book) {
    return this.#bookRepo.createBook(book);
  }
}

module.exports = CreateBookService;
