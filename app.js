const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const connection = require('./connection/connection');
const sessionsAuth = require("./helpers/sessions.auth");
const customerRoutes = require("./routes/customer.routes");
const itemRoutes = require("./routes/item.routes");
const outfitRoutes = require("./routes/outfit.routes");
const avatarRoutes = require("./routes/avatar.routes");
const fittingRoomRoutes = require("./routes/fittingRoom.routes");

connection();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(sessionsAuth);
app.use(customerRoutes);
app.use(itemRoutes);
app.use(outfitRoutes);
app.use(avatarRoutes);
app.use(fittingRoomRoutes);

app.listen(process.env.PORT, () => {
    console.log("server is running!!");
});

module.exports = app;