// eslint-disable-next-line func-names
const axiosStock = require("./stock-api.js");

module.exports = (app) => {
  // eslint-disable-next-line no-unused-vars
  app.route("/api/stock-prices").get(async (req, res) => {
    // eslint-disable-next-line no-unused-vars
    const { stock, like } = req.query;
    const stockData = await axiosStock.fetchStockInfo(stock);

    const dto = {
      stockData: { stock, price: stockData.data?.latestPrice, likes: 345344 },
    };
    res.send(dto);
  });
};
