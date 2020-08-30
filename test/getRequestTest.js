const chai =  require('chai');
const chaiHttp =  require('chai-http');
const app = require('../server');
const assert = chai.assert;

// configure chai settings
chai.use(chaiHttp);
chai.should();

/*
describe("GET /", () => {
    // test that it is able to connect and grab all ingredient list (if any)
    it("Should get all ingredients from mongoDB atlas", (done) => {
        chai.request(app)
            .get("/api/ingredients")
            .end((err, res) => {
                res.body.should.be.a("object");
                //assert.equal("success", res.body.status);
                done();
            });
    });
});*/

describe("GET single ingredient", () => {
    // test if can grab single ingredient via id 
    // for this test to work, please don't delete ID of 3 from the list
    it("Should get one ingredient based on ID", (done) => {
        chai.request(app)
            .get("/api/ingredients/3")
            .end((err, res) => {
                res.body.should.be.a("object");
                done();
        });
    })
});