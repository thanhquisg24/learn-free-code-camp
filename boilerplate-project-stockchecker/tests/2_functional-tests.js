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
  before((done) => {
    // eslint-disable-next-line no-unused-vars
    modelDb.ipLikedSchema.remove({}, (err) => {
      // eslint-disable-next-line no-unused-vars
      modelDb.stockLikeSchema.remove({}, (errr) => {
        done();
      });
    });
  });

  describe("/GET stock", () => {
    it("Viewing one stock", (done) => {
      chai
        .request(server)
        .get("/api/stock-prices?stock=goog")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("stockData");
          res.body.stockData.should.have.property("stock");
          res.body.stockData.should.have.property("price");
          res.body.stockData.should.have.property("likes");
          done();
        });
    });
  });
  describe("/GET stock and liking", () => {
    it("Viewing one stock and liking it", (done) => {
      chai
        .request(server)
        .get("/api/stock-prices?stock=goog&like=true")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("stockData");
          res.body.stockData.should.have.property("stock");
          res.body.stockData.should.have.property("price");
          res.body.stockData.should.have.property("likes").eql(0);
          done();
        });
    });
  });

  describe("/GET stock and liking", () => {
    it("Viewing the same stock and liking it again", (done) => {
      chai
        .request(server)
        .get("/api/stock-prices?stock=goog&like=true")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("stockData");
          res.body.stockData.should.have.property("stock");
          console.log(
            "🚀 ~ file: 2_functional-tests.js ~ line 67 ~ .end ~ res.body.stockData",
            res.body.stockData
          );
          res.body.stockData.should.have.property("price");
          res.body.stockData.should.have.property("likes").eql(1);
          done();
        });
    });
  });
});
