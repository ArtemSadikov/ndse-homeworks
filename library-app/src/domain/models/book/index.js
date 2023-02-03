const { v4 } = require('uuid');
const ValidationError = require( "../../../utils/errors/errors/validation.error" )

class Book {
  id
  title
  description
  authors
  favorite
  fileCover
  fileName

  constructor({
    id,
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
  }) {
    this.id = id || v4();

    if (!title) {
      throw new ValidationError('title', 'Must provide title.');
    }
    this.title = title;

    if (!description) {
      throw new ValidationError('description', 'Must provide description.');
    }
    this.description = description;

    if (!authors) {
      throw new ValidationError('authors', 'Must provide authors.');
    }
    this.authors = authors;

    if (!favorite) {
      throw new ValidationError('favorite', 'Must provide favorite.');
    }
    this.favorite = favorite;

    if (!fileCover) {
      throw new ValidationError('fileCover', 'Must provide fileCover.');
    }
    this.fileCover = fileCover;

    if (!fileName) {
      throw new ValidationError('fileName', 'Must provide fileName.');
    }
    this.fileName = fileName;
  }
}

module.exports = Book;
