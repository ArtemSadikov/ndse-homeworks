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
    return this.#books.slice(pagination.skip, pagination.limit);
  }

  async editBookByID(id, book) {
    let editedBook = null;

    for (const oldBook of this.#books) {
      if (oldBook.id !== id) {
        continue;
      }

      if (typeof book.title !== 'undefined') {
        oldBook.title = book.title;
      }

      if (typeof book.authors !== 'undefined') {
        oldBook.authors = book.authors;
      }

      if (typeof book.description !== 'undefined') {
        oldBook.description = book.description;
      }

      if (typeof book.favorite !== 'undefined') {
        oldBook.favorite = book.favorite;
      }

      if (typeof book.fileCover !== 'undefined') {
        oldBook.fileCover = book.fileCover;
      }

      if (typeof book.fileName !== 'undefined') {
        oldBook.fileName = book.fileName;
      }

      editedBook = { ...oldBook };
    }

    return editedBook;
  }

  async removeBookByID(id) {
    const oldLength = this.#books;
    this.#books = this.#books.filter(b => b.id !== id);
    return oldLength === this.#books.length;
  }

  async createBook(book) {
    const newBook = new Book({
      id: v4(),
      title: book.title,
      authors: book.authors,
      description: book.description,
      favorite: book.favorite,
      fileCover: book.fileCover,
      fileName: book.fileName,
    })

    this.#books.push(newBook);
    return newBook;
  }
}

module.exports = BookMemoryRepository;
