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
      console.log(
        "🚀 ~ file: api.js ~ line 11 ~ updateLike ~ ipLiked",
        ipLiked
      );
      await crud.createIplikeRecord(ip_symbol_hash);
      await crud.saveStockLikeRecord(stock, stockLikeSchemaId, true);
    }
  }
}

async function getStockItem(stock, isLike, ipAdress) {
  let dto = null;
  if (Array.isArray(stock)) {
    dto = null;
  } else {
    const stockData = await axiosStock.fetchStockInfo(stock);
    const stockLikedRecord = await crud.findOneStockLike(stock);
    dto = {
      stockData: {
        stock,
        price: stockData.data?.latestPrice,
        likes: stockLikedRecord?.likes || 0,
      },
    };
    await updateLike(
      // eslint-disable-next-line no-underscore-dangle
      stockLikedRecord ? stockLikedRecord._id : null,
      stock,
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
    } else {
      dto = await getStockItem(stock, like, ip);
    }
    res.send(dto);
  });
};
