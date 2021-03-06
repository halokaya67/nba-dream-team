// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const projectName = "NBA Dream Team";

app.locals.title = `${projectName}`;

const session = require('express-session');
const MongoStore = require('connect-mongo');
const axios = require('axios');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 24 * 60 * 60
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI || "mongodb://localhost/nba-dream-team",
        ttl: 24 * 60 * 60
    })
}));

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

const authRoutes = require('./routes/auth/auth.routes');
app.use("/", authRoutes);

const profileRoutes = require('./routes/profile/profile.routes');
app.use("/", profileRoutes);

const playerRoutes = require('./routes/player/player.routes');
app.use("/", playerRoutes);

const teamRoutes = require('./routes/team/team.routes');
app.use("/", teamRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
