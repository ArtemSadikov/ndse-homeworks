const NotFoundError = require( "../../../utils/errors/errors/not-found.error" );
const GetBookUseCase = require( "../../ports/in/book/use-case/get-book.use-case" );
const BookRepositoryPort = require( "../../ports/out/book/repository/book.repository.port" );

class GetBookService extends GetBookUseCase {
  #booksRepo = new BookRepositoryPort();

  constructor(booksRepo) {
    super();
    this.#booksRepo = booksRepo;
  }

  async getBookByID(id) {
    const result = await this.#booksRepo.getByID(id);

    if (!result) {
      throw new  NotFoundError(`Book with id = '${id}' not found`);
    }

    return result;
  }

  async getBooksList(pagination) {
    return this.#booksRepo.getList(pagination);
  }
}

module.exports = GetBookService;
