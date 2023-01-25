const useRoute = method => async (req, res, next) => {
  try {
    const response = await method(req, res);
    res.send({ data: response });
  } catch (err) {
    next(err);
  }
}

module.exports = useRoute;
