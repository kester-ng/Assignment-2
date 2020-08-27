// model for representing ingredients and its price and stock
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose)

// set-up the schema
var ingredientSchema = mongoose.Schema({
    _id: Number,
    name: {
        type: String,
        required: true
    },
    price: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
}, {_id: false});

ingredientSchema.plugin(AutoIncrement);

var Ingredient = module.exports = mongoose.model("ingredient", ingredientSchema);

module.exports.get = function(callback, limit) {
    Ingredient.find(callback).limit(limit);
}