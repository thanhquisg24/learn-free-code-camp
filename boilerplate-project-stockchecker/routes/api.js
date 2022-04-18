// eslint-disable-next-line func-names
module.exports = function (app) {
  // eslint-disable-next-line no-unused-vars
  app.route("/api/stock-prices").get((req, res) => {
    // eslint-disable-next-line no-unused-vars
    const { stock, like } = req.query;
  });
};
