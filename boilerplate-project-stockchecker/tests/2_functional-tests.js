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

  describe("/GET stock and liking again", () => {
    it("Viewing the same stock and liking it again", (done) => {
      chai
        .request(server)
        .get("/api/stock-prices?stock=goog&like=true")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("stockData");
          res.body.stockData.should.have.property("stock");
          res.body.stockData.should.have.property("price");
          res.body.stockData.should.have.property("likes").eql(1);
          done();
        });
    });
  });
  describe("/GET two stocks", () => {
    it("Viewing two stocks", (done) => {
      chai
        .request(server)
        .get("/api/stock-prices?stock=goog&stock=MSFT")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("stockData");
          res.body.stockData.should.be.an("array");
          res.body.stockData[0].should.have.property("stock");
          res.body.stockData[0].should.have.property("price");
          res.body.stockData[0].should.have.property("rel_likes").eql(1);
          res.body.stockData[1].should.have.property("stock");
          res.body.stockData[1].should.have.property("price");
          res.body.stockData[1].should.have.property("rel_likes").eql(-1);
          done();
        });
    });
  });
  describe("/GET two stocks", () => {
    it("Viewing two stocks and liking them", (done) => {
      chai
        .request(server)
        .get("/api/stock-prices?stock=goog&stock=MSFT&like=true")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("stockData");
          res.body.stockData.should.be.an("array");
          res.body.stockData[0].should.have.property("stock");
          res.body.stockData[0].should.have.property("price");
          res.body.stockData[0].should.have.property("rel_likes").eql(1);
          res.body.stockData[1].should.have.property("stock");
          res.body.stockData[1].should.have.property("price");
          res.body.stockData[1].should.have.property("rel_likes").eql(-1);
          done();
        });
    });
  });
});
