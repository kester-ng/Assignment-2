// import ingredient model
Ingredient = require("./ingredientModel");

// Handle index actions
exports.index = function(req, res) {
    Ingredient.get(function(err, ingredients) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
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

    ingredient.save(function (err) {
        res.json({
            message: 'New ingredient created!',
            data: ingredient
        });
    })
};

// Handle get requests
exports.view = function(req, res) {
    Ingredient.findById(req.params.ingredient_id, function(err, ingredient) {
        if (err)
            res.send(err);
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
        if (err)
            res.send(err);
        ingredient.name = req.body.name ? req.body.name : ingredient.name;            
        ingredient.price = req.body.price;
        ingredient.stock = req.body.stock;
        // save the contact and check for errors
        ingredient.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Ingredient Info updated',
                data: ingredient
            });
        });
    });
};

// Handle delete contact
exports.delete = function (req, res) {
    Ingredient.remove({
        _id: req.params.ingredient_id
    }, function (err, contact) {
        if (err)
            res.send(err);
            res.json({
                status: "success",
                message: 'Ingredient deleted'
        });
    });
};
