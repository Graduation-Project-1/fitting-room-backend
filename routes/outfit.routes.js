const app = require('express').Router();
const {
    createOutfit,
    editOutfit,
    getAllOutfits,
    getCurrentCustomerOutfits,
    searchOutfit
} = require("../controller/outfit/outfit.controller");

const isAuthorized = require("../helpers/isAuthorized");
const {
    CREATE_OUTFIT,
    EDIT_OUTFIT,
    GET_ALL_OUTFITS,
    GET_CURRENT_CUSTOMER_OUTFITS,
    SEARCH_OUTFIT
} = require("../endpoints/endpoints");

app.post("/createOutfit", isAuthorized(CREATE_OUTFIT), createOutfit);
app.put("/editOutfit/:id", isAuthorized(EDIT_OUTFIT), editOutfit);
app.get("/getAllOutfits", isAuthorized(GET_ALL_OUTFITS), getAllOutfits);
app.get("/getCurrentCustomerOutfits", isAuthorized(GET_CURRENT_CUSTOMER_OUTFITS), getCurrentCustomerOutfits);
app.get("/searchOutfit", isAuthorized(SEARCH_OUTFIT), searchOutfit);


module.exports = app;