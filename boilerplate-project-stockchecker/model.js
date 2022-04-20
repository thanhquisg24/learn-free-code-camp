const mongoose = require("mongoose");

const StockLikeSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
});
const ipLikedSchema = new mongoose.Schema({
  ip_symbol_hash: {
    type: String,
    required: true,
  },
});
const IpLiked = mongoose.model("IpLikeSchema", ipLikedSchema);
const StockLike = mongoose.model("StockLike", StockLikeSchema);

module.exports = { IpLiked, StockLike };
