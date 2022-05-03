// eslint-disable-next-line func-names
const md5 = require("md5");
const axiosStock = require("./stock-api.js");
const crud = require("../crud.js");

async function updateLike(stockLikeSchemaId, stock, isLike, ipAdress) {
  if (isLike === "true") {
    // eslint-disable-next-line camelcase
    const ip_symbol_hash = md5(stock.concat(ipAdress));
    const ipLiked = await crud.findOneIpliked(ip_symbol_hash);
    if (ipLiked == null || ipLiked === undefined) {
      await crud.createIplikeRecord(ip_symbol_hash);
      await crud.saveStockLikeRecord(stock, stockLikeSchemaId, true);
    }
  }
}

async function getStockItem(stock, isLike, ipAdress) {
  let dto = null;
  const stockLower = stock.toLowerCase();
  if (Array.isArray(stockLower)) {
    dto = null;
  } else {
    const stockData = await axiosStock.fetchStockInfo(stockLower);
    const stockLikedRecord = await crud.findOneStockLike(stockLower);
    dto = {
      stockData: {
        stock: stockLower,
        price: stockData.data?.latestPrice,
        likes: stockLikedRecord?.likes || 0,
      },
    };
    await updateLike(
      // eslint-disable-next-line no-underscore-dangle
      stockLikedRecord ? stockLikedRecord._id : null,
      stockLower,
      isLike,
      ipAdress
    );
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
    let dto = null;
    if (Array.isArray(stock)) {
      dto = null;
      let stock_1 = await getStockItem(stock[0], like, ip);
      let stock_2 = await getStockItem(stock[1], like, ip);
      dto = {
        stockData: [
          {
            stock: stock_1.stockData.stock,
            price: stock_1.stockData.price,
            rel_likes: stock_1.stockData.likes - stock_2.stockData.likes,
          },
          {
            stock: stock_2.stockData.stock,
            price: stock_2.stockData.price,
            rel_likes: stock_2.stockData.likes - stock_1.stockData.likes,
          },
        ],
      };
    } else {
      dto = await getStockItem(stock, like, ip);
    }
    res.send(dto);
  });
};
