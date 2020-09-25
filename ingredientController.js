// import ingredient model
const Ingredient = require("./ingredientModel");

// Handle index actions for base
exports.index = function(req, res) {
    Ingredient.get(function(err, ingredients) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
            return;
        }
        res.json({
            status: "success",
            message: "Ingredients retrieved successfully",
            data: ingredients
        });
    })
};

// Handle create/POST actions
exports.new = function(req, res) {
    var ingredient = new Ingredient();
    ingredient.name = req.body.name? req.body.name : ingredient.name;
    ingredient.price = req.body.price;
    ingredient.stock = req.body.stock;

    // check for duplicates
    Ingredient.findOne({name: ingredient.name, price: ingredient.price, stock:ingredient.stock}, function(err, found) {
        if (err) {
            res.json({
                status:"Error, please try again",
                message: err
            });
            return;
        }

        if (found) {
            res.json({
                status: "Already saved inside!",
                message: "Duplicate entry"
            });
        } else {
            ingredient.save(function (err, data) {
                if (err) {
                    res.json({
                        status: "Error!",
                        message: err
                    });
                    return;
                } else {
                    res.json({
                        message: 'New ingredient created!',
                        data: ingredient
                    });
                }
            })
        }
    });

};

// Handle get requests for one particular ingredient
exports.view = function(req, res) {
    Ingredient.findById(req.params.ingredient_id, function(err, ingredient) {
        if (err) {
            res.send(err);
            return;
        }
        res.json({
            message: 'Ingredient details loading..',
            data: ingredient
        });
    })
}

// Handle Updates
// Handle update contact info
exports.update = function (req, res) {
    Ingredient.findById(req.params.ingredient_id, function (err, ingredient) {
        if (err) {
            res.send(err);
            return;
        }
        try {
            ingredient.name = req.body.name ? req.body.name : ingredient.name;            
            ingredient.price = req.body.price? req.body.price: ingredient.price;
            ingredient.stock = req.body.stock? req.body.stock: ingredient.stock;
            // save the contact and check for errors
            ingredient.save(function (err) {
                if (err) {
                    res.json(err);
                    return;
                }
                res.json({
                    message: 'Ingredient Info updated',
                    data: ingredient
                });
            });
        } catch (err) {
            res.json({
                status: "Error!",
                message: err
            })
            return;
        }
    });
};

// Handle delete contact
exports.delete = function (req, res) {
    Ingredient.remove({
        _id: req.params.ingredient_id
    }, function (err, data) {
        if (err) {
            res.send(err);
            return;
        } else {
            res.json({
                status: "success",
                message: 'Ingredient deleted',
                data: data
            });
        }
    });
};
