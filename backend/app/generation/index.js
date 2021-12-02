const {REFRESH_RATE, SECONDS} = require("../config.js");
const Dragon = require("../dragon.js");

const refreshRate = REFRESH_RATE * SECONDS;

class Generation {
    constructor() {
        this.expiration = calculateExpiration();
    }

    newDragon() {
        if(Date.now() > this.expiration) {
            throw new Error(`This generation expired on ${this.expiration}`);
        }

        return new Dragon();
    }
};

function calculateExpiration() {
    const expirationPeriod = Math.floor(Math.random() * (refreshRate/2));
    const msUntilExpiration = Math.random() < 0.5 ? refreshRate - expirationPeriod : refreshRate + expirationPeriod;

    return new Date(Date.now() + msUntilExpiration);
};

module.exports = Generation;