const mongoose = require("mongoose");

const username = "api_user";
const password = "api1234";
const cluster = "localhost:27017";
const dbname = "api_dev_db";

function connectToMongo() {
  mongoose.connect(
    `mongodb://${username}:${password}@${cluster}/${dbname}?retryWrites=true&w=majority`,
    {
      // useNewUrlParser: true,
      // useFindAndModify: false,
      useUnifiedTopology: true,
    }
  );
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", () => {
    console.log("Connected successfully");
  });
}
module.exports = {
  connectToMongo,
};
