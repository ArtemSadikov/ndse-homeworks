exports.DEFAULT_PAGE = 1;
exports.DEFAULT_LIMIT = 20;

function getPagination(query = { page: exports.DEFAULT_PAGE, limit: exports.DEFAULT_LIMIT }) {
  const page = Number.isNaN(Number(query.page)) ? exports.DEFAULT_PAGE : Number(query.page);
  const limit = Number.isNaN(Number(query.limit)) ? exports.DEFAULT_LIMIT : Number(query.limit);

  return {
    page,
    limit,
    get skip() {
      return this.page * this.limit;
    }
  }
}

module.exports = getPagination;
