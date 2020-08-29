// api-routes.js

// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'CS3219 Assignment 2A :3',
    });
});

var ingredientController = require("./ingredientController");

// Contact routes
router.route('/ingredients')
    .get(ingredientController.index)
    .post(ingredientController.new);

router.route('/ingredients/:ingredient_id')
    .get(ingredientController.view)
    .patch(ingredientController.update)
    .put(ingredientController.update)
    .delete(ingredientController.delete);

module.exports = router;