const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const outfitSchema = new Schema({
    outfitName: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "customer"
    },
    socks: {
        type: mongoose.Types.ObjectId,
        ref: "item"
    },
    shoes: {
        type: mongoose.Types.ObjectId,
        ref: "item",
    },
    trousers: {
        type: mongoose.Types.ObjectId,
        ref: "item"
    },
    shirt: {
        type: mongoose.Types.ObjectId,
        ref: "item",
    },
    jacket: {
        type: mongoose.Types.ObjectId,
        ref: "item",
    },
    accessories: [{
        type: mongoose.Types.ObjectId,
        ref: "item",
    }],
    Policy: {
        type: String,
        enum: ["private", "public"],
        default: "public"
    }
});

const outfitModel = mongoose.model("outfit", outfitSchema);

module.exports = outfitModel;