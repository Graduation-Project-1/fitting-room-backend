const app = require('express').Router();
const {
    openFittingRoom,
    closeFittingRoom,
    toggleLikeItem,
    getCurrentCustomer
} = require("../controller/customer/customer.controller");

const { checkSession } = require("../utils/checkSession.utils");
const isAuthorized = require("../helpers/isAuthorized");
const { TOGGLE_LIKE_ITEM, GET_CURRENT_CUSTOMER } = require("../endpoints/endpoints");

app.get("/openFittingRoom/:id", openFittingRoom);
app.get("/closeFittingRoom", checkSession, closeFittingRoom);
app.put("/toggleLikeItem/:id", isAuthorized(TOGGLE_LIKE_ITEM), toggleLikeItem)
app.get("/getCurrentCustomer", isAuthorized(GET_CURRENT_CUSTOMER), getCurrentCustomer);


module.exports = app;