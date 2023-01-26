const GetBookUseCase = require( "../../ports/in/book/use-case/get-book.use-case" );
const BookRepositoryPort = require( "../../ports/out/book/repository/book.repository.port" );

class GetBookService extends GetBookUseCase {
  #booksRepo = new BookRepositoryPort();

  constructor(booksRepo) {
    super();
    this.#booksRepo = booksRepo;
  }

  async getBookByID(id) {
    return this.#booksRepo.getByID(id);
  }

  async getBooksList(pagination) {
    return this.#booksRepo.getList(pagination);
  }
}

module.exports = GetBookService;
