// A container class for query functions to store the generations in our db

const pool = require('../../databasePool.js');

class GenerationTable {
    static storeGeneration(generation) {
        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO generation(expiration) VALUES($1) RETURNING id',
            [generation.expiration],
            (error, response) => {
                if(error) return reject(error);

                const generationId = response.rows[0].id;

                resolve({ generationId });
            });
        });
    }
}

module.exports = GenerationTable;