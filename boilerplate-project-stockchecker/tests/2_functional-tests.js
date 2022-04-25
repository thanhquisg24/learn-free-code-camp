const chaiHttp = require("chai-http");
const chai = require("chai");
const modelDb = require("../model");

// eslint-disable-next-line no-unused-vars
const server = require("../server");

// eslint-disable-next-line no-unused-vars
const { assert } = chai;
const should = chai.should();
chai.use(chaiHttp);

describe("Function test", () => {
  beforeEach((done) => {
    // eslint-disable-next-line no-unused-vars
    modelDb.ipLikedSchema.remove({}, (err) => {
      // eslint-disable-next-line no-unused-vars
      modelDb.stockLikeSchema.remove({}, (errr) => {
        done();
      });
    });
  });
  /*
   * Test the /GET route
   */
  describe("/GET stock", () => {
    it("it should GET one stock", (done) => {
      chai
        .request(server)
        .get("/api/stock-prices?stock=goog")
        .end((err, res) => {
          console.log(
            "🚀 ~ file: 2_functional-tests.js ~ line 31 ~ .end ~ res",
            res.body
          );
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.deep.property("stockData.stock");
          //   res.body.book.should.have.property("stockData");
          //   res.body.book.should.have.property("stockData.price");
          //   res.body.book.should.have.property("stockData.likes");
          done();
        });
    });
  });
});
