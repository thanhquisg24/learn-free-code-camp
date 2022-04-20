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
const IpLikedSchema = new mongoose.Schema({
  ip_symbol_hash: {
    type: String,
    required: true,
  },
});
const ipLikedSchema = mongoose.model("IpLikedSchema", IpLikedSchema);
const stockLikeSchema = mongoose.model("StockLikeSchema", StockLikeSchema);

module.exports = { ipLikedSchema, stockLikeSchema };
