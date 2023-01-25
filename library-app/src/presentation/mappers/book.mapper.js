class BookMapper {
  static toOut(model) {
    return {
      id: model.id,
      title: model.title,
      description: model.description,
      authors: model.authors,
      favorite: model.favorite,
      fileCover: model.fileCover,
      fileName: model.fileName,
    }
  }
}

module.exports = BookMapper;
