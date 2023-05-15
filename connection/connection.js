const mongoose = require('mongoose');

const connect = () => {
    return mongoose.connect(process.env.LOCAL_DATABASE_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Connected to database');
    }).catch((err) => {
        console.error('Error connecting to database', err);
    });
}

module.exports = connect;