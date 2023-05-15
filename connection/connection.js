const mongoose = require('mongoose');

const connect = () => {
    return mongoose.connect(process.env.CONNECTION_STRING_DEPLOY, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Connected to database');
    }).catch((err) => {
        console.error('Error connecting to database', err);
    });
}

module.exports = connect;