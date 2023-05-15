const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const avatarSchema = new Schema({
    avatarModel: String,
    avatarBodyType: String
});

const avatarModel = mongoose.model('avatar', avatarSchema);

module.exports = avatarModel;