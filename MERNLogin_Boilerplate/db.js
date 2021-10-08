const mongoose = require('mongoose');

const connectDb = async() => {
    try {
        const url = 'mongodb://127.0.0.1:27017/TestDatabase';
        const options = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        };
        const connection = await mongoose.connect(url, options);
        if (connection) {
            console.log('Connected to database');
        }
    } catch (e) {
        console.log('No Database connection');
        console.log(`Error ${e}`);
    }
}

connectDb();

module.exports = connectDb;