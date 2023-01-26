const HTTPStatusCodes = require( "../../../utils/http-status-codes/http-status-codes" );

const useRoute = method => async (req, res, next) => {
  try {
    const response = await method(req, res);
    if (res.statusCode === undefined) {
      res.status(HTTPStatusCodes.OK);
    }
    res.send({
      statusCode: res.statusCode,
      data: response,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = useRoute;
