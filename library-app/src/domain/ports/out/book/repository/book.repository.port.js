class BookRepositoryPort {
  async getByID(_id) {
    throw new Error("Method is not implemented.");
  }

  async getList(_pagination) {
    throw new Error("Method is not implemented.");
  }

  async editBookByID(_id, _book) {
    throw new Error("Method is not implemented.");
  }

  async removeBookByID(_id) {
    throw new Error("Method is not implemented.");
  }

  async createBook(_book) {
    throw new Error("Method is not implemented.");
  }
}

module.exports = BookRepositoryPort;
