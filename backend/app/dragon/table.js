// A container class for functions that will allow us to query 
// our dragon db

const pool = require('../../databasePool.js');

class DragonTable {
    static storeDragon(dragon) {
        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO dragon(birthdate, nickname, "generationId")
             VALUES($1, $2, $3) RETURNING id`,
            [dragon.birthdate, dragon.nickname, dragon.generationId],
            (error, response) => {
                if(error) return reject(error);

                const dragonId = response.rows[0].id;
                resolve({ dragonId });
            });
        });
    }
}

module.exports = DragonTable;