const chai =  require('chai');
const chaiHttp =  require('chai-http');
const app = require('../server');
const assert = chai.assert;
const expect = chai.expect;

// configure chai settings
chai.use(chaiHttp);
chai.should();

var id; // used to store the id for the ingredient created

describe("POST /", () => {
    // post a new ingredient and check if it is working properly
    it("Should create a new ingredient", (done) => {
        chai.request(app)
            .post("/api/ingredients")
            .set("content-type", "application/x-www-form-urlencoded")
            .send({name: "Triple Cheese Pizza", price: 25.50, stock: 14}) // craving some of them right now sobs
            .end((err, res)=> {
                if (err) {
                    done(err);
                } else {
                    res.body.should.be.a('object');
                    id = res.body.data["_id"];
                    console.log(id);
                    done();
                }
            });
    });
});

const pizza = "Pepperoni Pizza";
const price = 21.00;
const stock = 20;

describe("UPDATE /", () => {
    // should update Triple cheese pizza to Pepperoni Pizza, and its relevant details
    it("Update new pizza", (done) => {
        chai.request(app)
            .put("/api/ingredients/" + id)
            .set("content-type", "application/x-www-form-urlencoded")
            .send({name: pizza, price: price, stock: stock})
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    res.body.should.be.a("object")
                    // check if all the field are properly updated
                    assert.equal(pizza, res.body.data["name"]);
                    assert.equal(stock, res.body.data["stock"]);
                    done();
            }
        });
    });
});

// now check for delete
describe("DELETE /", ()=> {
    // should delete the pizza inserted earlier
    it("Delete pizza", (done) => {
        chai.request(app)
            .delete("/api/ingredients/" + id)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    res.body.should.be.a("object")
                    done();
                }
            });
    });
});
