// Set up a Pool object that allows us to connect to our postgres db

const { Pool } = require('pg');
const databaseConfiguration = require('./secrets/databaseConfiguration.js');

const pool = new Pool(databaseConfiguration);

module.exports = pool;
