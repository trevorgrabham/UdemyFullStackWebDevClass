// Setup and routing for the express app
// 
// All of the routers are imported from the api folder and 
// the generationEngine is stored in the locals field of the app
const express = require("express");
const GenerationEngine = require("./generation/generationEngine.js");
const dragonRouter = require('./api/dragon.js');
const generationRouter = require('./api/generation.js');

const app = express();

app.use('/dragon', dragonRouter);
app.use('/generation', generationRouter);

const generationEngine = new GenerationEngine();
app.locals.generationEngine = generationEngine;
generationEngine.start();

module.exports = app;