const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    numberOfReviews: {
        type: Number,
        default: 0,
    },
    numberOfLikes: {
        type: Number,
        default: 0,
    },
    averageRate: {
        type: Number,
        default: 0,
    },
    cover: {
        type: String,
    },
    gender: {
        type: String,
        required: true,
    },
    isAdult: {
        type: Boolean,
        required: true,
    },
    discountRate: {
        type: Number,
    },
    images: {
        type: Array,
        default: [],
    },
    sizes: {
        type: Array,
        default: [],
    },
    colors: {
        type: Array,
        default: [],
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'brand',
    },
    categoryList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
    }],
    collectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'collection',
    },
    isArchived: {
        type: Boolean,
        default: false,
    },
    model: {
        small: String,
        meduim: String,
        large: String
    },
    itemType: {
        type: String,
        enum: ["shirt", "trousers", "shoes", "socks", "jacket", "accessories"],
        default: null
    }
});

const itemModel = mongoose.model('item', itemSchema);

module.exports = itemModel;