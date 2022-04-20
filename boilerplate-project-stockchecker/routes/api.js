// eslint-disable-next-line func-names
const axiosStock = require("./stock-api.js");

async function getStockItem(stock, isLike) {
  let dto = null;
  if (Array.isArray(stock)) {
    dto = null;
  } else {
    const stockData = await axiosStock.fetchStockInfo(stock);
    dto = {
      stockData: { stock, price: stockData.data?.latestPrice, likes: 345344 },
    };
  }
  return dto;
}

module.exports = (app) => {
  // eslint-disable-next-line no-unused-vars
  app.route("/api/stock-prices").get(async (req, res) => {
    // eslint-disable-next-line no-unused-vars
    const { stock, like } = req.query;
    const ip =
      req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    console.log("🚀 ~ file: api.js ~ line 22 ~ app.route ~ ip", ip);
    let dto = null;
    if (Array.isArray(stock)) {
      dto = null;
    } else {
      const stockData = await axiosStock.fetchStockInfo(stock);
      dto = {
        stockData: { stock, price: stockData.data?.latestPrice, likes: 345344 },
      };
    }
    res.send(dto);
  });
};
