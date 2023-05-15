const app = require('express').Router();

const isAuthorized = require("../helpers/isAuthorized");

const {
    addItemToSelectedItemList,
    removeItemFromSelectedItemList,
    addOutfitToSelectedOutfitList,
    removeOutfitFromSelectedOutfitList,
    changeAvatarBodyType,
    getCurrentCustomerFittingRoom
} = require("../controller/fittingRoom/fittingRoom.controller");

const {
    ADD_ITEM_TO_SELECTED_ITEM_LIST,
    REMOVE_ITEM_FROM_SELECTED_ITEM_LIST,
    ADD_OUTFIT_TO_SELECTED_OUTFIT_LIST,
    REMOVE_OUTFIT_FROM_SELECTED_OUTFIT_LIST,
    CHANGE_AVATAR_BODY_TYPE,
    GET_CURRENT_CUSTOMER_FITTING_ROOM
} = require("../endpoints/endpoints");

app.put("/addItemToSelectedItemList/:id", isAuthorized(ADD_ITEM_TO_SELECTED_ITEM_LIST), addItemToSelectedItemList);
app.put("/removeItemFromSelectedItemList/:id", isAuthorized(REMOVE_ITEM_FROM_SELECTED_ITEM_LIST), removeItemFromSelectedItemList);
app.put("/addOutfitToSelectedOutfitList/:id", isAuthorized(ADD_OUTFIT_TO_SELECTED_OUTFIT_LIST), addOutfitToSelectedOutfitList);
app.put("/removeOutfitFromSelectedOutfitList/:id", isAuthorized(REMOVE_OUTFIT_FROM_SELECTED_OUTFIT_LIST), removeOutfitFromSelectedOutfitList);
app.put("/changeAvatarBodyType/:id", isAuthorized(CHANGE_AVATAR_BODY_TYPE), changeAvatarBodyType);
app.get("/getCurrentCustomerFittingRoom", isAuthorized(GET_CURRENT_CUSTOMER_FITTING_ROOM), getCurrentCustomerFittingRoom);

module.exports = app;