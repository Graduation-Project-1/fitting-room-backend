const app = require('express').Router();
const {
    addAvatar,
    editAvatar,
    deleteAvatar,
    getAvatar,
    getAllAvatars
} = require("../controller/avatar/avatar.conroller");
const upload = require("../utils/multer.utils");
const isAuthorized = require("../helpers/isAuthorized");
const {
    ADD_AVATAR,
    EDIT_AVATAR,
    DELETE_AVATAR,
    GET_AVATAR,
    GET_ALL_AVATARS
} = require("../endpoints/endpoints");

app.post("/addAvatar/:bodyType", [upload.single("avatarModel"), isAuthorized(ADD_AVATAR)], addAvatar);
app.put("/editAvatar/:id", [upload.single("avatarModel"), isAuthorized(EDIT_AVATAR)], editAvatar);
app.delete("/deleteAvatar/:id", isAuthorized(DELETE_AVATAR), deleteAvatar);
app.get("/getAvatar/:id", isAuthorized(GET_AVATAR), getAvatar);
app.get("/getAllAvatars", isAuthorized(GET_ALL_AVATARS), getAllAvatars);

module.exports = app;