// A GenerationEngine class that spawns a new generation when the current one expires
//
// Asynchronously calls a function to wait until the current generation is expired 
// and then creates a new generation. 
//
// start() function will begin the first generation, and the stop() function will 
// terminate further generations after the current one expires

const Generation = require("./index.js");

class GenerationEngine {
    constructor() {
        this.generation = null;
        this.timer = null;
    }

    start() {
        this.newGeneration();
    }

    stop() {
        clearTimeout(this.timer);
    }

    newGeneration() {
        this.generation = new Generation();
        console.log("new generation being created");
        console.log("current generation", this.generation)

        this.timer = setTimeout(() => {
            this.newGeneration();
        }, this.generation.expiration.getTime() - Date.now());
    }
}

module.exports = GenerationEngine;