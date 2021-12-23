// Setup and routing for the express app
// 
// All of the routers are imported from the api folder and 
// the generationEngine is stored in the locals field of the app
const express = require("express");
const cors = require('cors');
const bodyPaser = require('body-parser');
const GenerationEngine = require("./generation/generationEngine.js");
const dragonRouter = require('./api/dragon.js');
const generationRouter = require('./api/generation.js');
const accountRouter = require('./api/account.js');

const app = express();

app.use(cors({ origin: 'http://localhost:1234'}));
app.use(bodyPaser.json());

app.use('/account', accountRouter);
app.use('/dragon', dragonRouter);
app.use('/generation', generationRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode)
        .json({
            type: 'error',
            message: err.message
        });
});

const generationEngine = new GenerationEngine();
app.locals.generationEngine = generationEngine;
generationEngine.start();

module.exports = app;