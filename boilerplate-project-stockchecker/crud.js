const modelDb = require("./model");

// eslint-disable-next-line camelcase
async function findOneIpliked(ip_symbol_hash) {
  // eslint-disable-next-line camelcase
  const doc = await modelDb.ipLikedSchema.findOne({ ip_symbol_hash });
  return doc;
}

// eslint-disable-next-line camelcase
async function createIplikeRecord(ip_symbol_hash) {
  try {
    // eslint-disable-next-line camelcase
    await modelDb.ipLikedSchema.create({ ip_symbol_hash });
  } catch (error) {
    console.error(error);
  }
}

// eslint-disable-next-line camelcase
async function findOneStockLike(symbol) {
  // eslint-disable-next-line camelcase
  const doc = await modelDb.stockLikeSchema.findOne({ symbol });
  return doc;
}

async function saveStockLikeRecord(symbol, id, isInsLike) {
  if (id) {
    const doc = await modelDb.stockLikeSchema.findById(id);
    doc.likes += isInsLike ? 1 : 0;
    await modelDb.stockLikeSchema.updateOne(doc);
  } else {
    await modelDb.stockLikeSchema.create({ symbol, likes: isInsLike ? 1 : 0 });
  }
}

module.exports = {
  findOneIpliked,
  createIplikeRecord,
  findOneStockLike,
  saveStockLikeRecord,
};
