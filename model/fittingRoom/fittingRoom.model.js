const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fittingRoomSchema = new Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer'
    },
    selectedItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item'
    }],
    selectedOutfits: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'outfit'
    }],
    avatar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'avatar'
    }
});

const fittingRoomModel = mongoose.model('fittingRoom', fittingRoomSchema);

module.exports = fittingRoomModel;