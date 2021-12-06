const { Pool } = require('pg');
const databaseConfiguration = require('./secrets/databaseConfiguration.js');

const pool = Pool(databaseConfiguration);

module.exports = pool;