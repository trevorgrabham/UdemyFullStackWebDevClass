// Exports constants for the millisecond values of each of the constants
//
// REFRESH_RATE is the multiplier for each of the constants

const SECONDS = 1000;
const MINUTES = SECONDS * 60;
const HOURS = MINUTES * 60;
const DAYS = HOURS * 24;

const REFRESH_RATE = 5; // units

module.exports = {
    SECONDS,
    MINUTES,
    HOURS, 
    DAYS,
    REFRESH_RATE
}