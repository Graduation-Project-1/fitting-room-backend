let session = require("express-session");
let mongoSessionStore = require("connect-mongodb-session")(session);

let sessionStore = new mongoSessionStore({
    uri: process.env.LOCAL_DATABASE_CONNECTION,
    collection: "Sessions",
});

sessionStore.on("error", (err) => {
    console.log("Mongo Session Store Error " + err);
})

module.exports = session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        secure: false
    }
});