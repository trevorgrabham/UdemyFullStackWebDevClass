// A generation class 
// Only allows users to create new dragons during a generation period
// 
// Each generation has its own newDragon() function that throws an error if called after 
// the generation has expired. The generations expiration date is stored as a Date object
// 
// The referesh rate for each generation is variable, with each refresh rate being +-50%. 
// All of the constants for SECONDS, MINUTES, HOURS, and DAYS are in the config.js file

const {REFRESH_RATE, SECONDS} = require("../config.js");
const Dragon = require("../dragon/index.js");

const refreshRate = REFRESH_RATE * SECONDS;

class Generation {
    constructor() {
        this.expiration = calculateExpiration();
        this.generationId = undefined;
    }

    newDragon() {
        if(Date.now() > this.expiration) {
            throw new Error(`This generation expired on ${this.expiration}`);
        }

        if(!this.generationId) {
            throw new Error('This generation does not have an associated id');
        }

        return new Dragon({generationId: this.generationId});
    }
};

function calculateExpiration() {
    const expirationPeriod = Math.floor(Math.random() * (refreshRate/2));
    const msUntilExpiration = Math.random() < 0.5 ? refreshRate - expirationPeriod : refreshRate + expirationPeriod;

    return new Date(Date.now() + msUntilExpiration);
};

module.exports = Generation;