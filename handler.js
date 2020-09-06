require('dotenv').config({ path: './variables.env' });
const connectToDb = require("./db");
const Ingredients = require("./ingredientModel");
const MongoClient = require('mongodb').MongoClient;

const URI = 'mongodb+srv://test:admin@cs3219.fws9e.gcp.mongodb.net/API?retryWrites=true&w=majority';
let cachedDB = null;

function connectToDatabase(uri) {
    console.log('=> connect to database');

    if (cachedDb != null) {
        console.log('=> using cached database instance');
        return Promise.resolve(cachedDb);
    }

    return MongoClient.connect(uri)
        .then(db => {
        cachedDb = db;
        return cachedDb;
    });
}

module.exports

module.exports.getAllIngredients = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    connectToDb().then(() => {
        Ingredients.find()
            .then(ingredients => callback(null, {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify({
                    ingredients: ingredients,
                    message: "Ingredients all collected!"
                })
            }))
            .catch(err => callback(null, {
                statusCode: err.statusCode || 500
            })
        );
    });
};

module.exports.getOneIngredient = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    connectToDb().then(() => {
        Ingredients.findById(event.pathParameters.id)
            .then(ingredients => callback(null, {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify({
                    ingredients: ingredients,
                    message: "Ingredients all collected!"
                })
            }))
            .catch(err => callback(null, {
                statusCode: err.statusCode || 500
            })
        );
    });
};

module.exports.create = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    connectToDb().then(() => {
        Ingredients.create(JSON.parse(event.body))
            .then(ingredient => callback(null, {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify({
                    ingredients: ingredient,
                    message: "Ingredients created!"
                })
            }))
            .catch(err => callback(null, {
                statusCode: err.statusCode || 500
            })
        );
    });
};

module.exports.updateIngredient = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    connectToDb().then(() => {
        Ingredients.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), {
            new: true
        })
            .then(ingredient => callback(null, {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify({
                    ingredients: ingredient,
                    message: "Ingredients updated!"
                })
            }))
            .catch(err => callback(null, {
                statusCode: err.statusCode || 500
            })
        );
    });
};

module.exports.deleteIngredient = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    connectToDb().then(() => {
        Ingredients.findByIdAndRemove(event.pathParameters.id)
            .then(ingredient => callback(null, {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify({
                    ingredients: ingredient,
                    message: "Ingredients Removed!"
                })
            }))
            .catch(err => callback(null, {
                statusCode: err.statusCode || 500
            })
        );
    });
};
