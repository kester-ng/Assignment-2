// module to connect to the db
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let isConnected;

module.exports = connectToDB = () => {
    if (isConnected) {
        console.log("DB connected successfully!");
        return Promise.resolve();
    }

    // create new connection and log it
    console.log("Establishing connection to DB");
    return mongoose.connect(process.env.DB).then(db => {
        isConnected = db.connections[0].readyState;
    });
};
