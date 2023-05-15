const app = require('express').Router();
const { uploadItemModel, deleteItemModel, getItem, getAllItems, editItemType } = require("../controller/item/item.controller");
const upload = require("../utils/multer.utils");
const isAuthorized = require("../helpers/isAuthorized");
const {
    UPLOAD_ITEM_MODEL,
    DELETE_ITEM_MODEL,
    GET_ITEM,
    GET_ALL_ITEMS,
    EDIT_ITEM_TYPE } = require('../endpoints/endpoints');

app.put("/uploadItemModel/:id/:size", [upload.single("model"), isAuthorized(UPLOAD_ITEM_MODEL)], uploadItemModel);
app.delete("/deleteItemModel/:id/:size", isAuthorized(DELETE_ITEM_MODEL), deleteItemModel);
app.get("/getItem/:id", isAuthorized(GET_ITEM), getItem);
app.get("/getAllItems", isAuthorized(GET_ALL_ITEMS), getAllItems);
app.put("/editItemType/:id", isAuthorized(EDIT_ITEM_TYPE), editItemType);

module.exports = app;