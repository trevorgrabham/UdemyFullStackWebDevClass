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