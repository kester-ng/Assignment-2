const chai =  require('chai');
const chaiHttp =  require('chai-http');
const app = require('../server');

// configure chai settings
chai.use(chaiHttp);
chai.should();

describe("GET /", () => {
    // test that it is able to connect and grab all ingredient list (if any)
    it("Should get all ingredients from mongoDB atlas", (done) => {
        chai.request(app)
            .get("/api/ingredients")
            .end((err, res) => {
                res.body.should.be.a("object");
                done()
            });
    });
})