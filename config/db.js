
//Connecter à mongoDb v2.3
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');//.get to get things from config we got the url that exists on default

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            //useUnifiedTopology: true,
            //useCreateIndex: true,
            //useFindAndModify: false
            });
        console.log("MongoDB connecting...");
    } catch (error) {
        console.log(error.message);
        //exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;