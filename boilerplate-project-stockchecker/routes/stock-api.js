const axios = require("axios");

function fetchStockInfo(symbol) {
  return axios.get(
    `https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${symbol}/quote`
  );
}
module.exports = {
  fetchStockInfo,
};
