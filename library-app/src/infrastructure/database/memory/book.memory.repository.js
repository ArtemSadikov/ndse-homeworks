const { v4 } = require('uuid');
const Book = require( "../../../domain/models/book" );
const BookRepositoryPort = require( "../../../domain/ports/out/book/repository/book.repository.port" );

class BookMemoryRepository extends BookRepositoryPort {
  #books = [];

  #initialize = () => {
    const booksCount = Math.round(Math.random() * (100 - 19));

    for (let i = 0; i < booksCount; i++) {
      this.#books.push(new Book({
        id: v4(),
        title: 'Book #' + i,
        authors: 'Book authors',
        description: 'Book description',
        favorite: 'Book favorite',
        fileCover: 'Book cover',
        fileName: 'Book name',
      }))
    }

    this.#books
  }

  constructor() {
    super();
    this.#initialize();
  }

  async getByID(id) {
    return this.#books.find(b => b.id === id);
  }

  async getList(pagination) {
    const result = this.#books.slice(pagination.skip, pagination.limit);
    return result;
  }
}

module.exports = BookMemoryRepository;
