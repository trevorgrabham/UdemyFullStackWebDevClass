// A container class for functions that will allow us to query 
// our dragon db

const pool = require('../../databasePool.js');
const DragonTraitTable = require('../dragonTrait/table.js');

class DragonTable {
    static storeDragon(dragon) {
        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO dragon(birthdate, nickname, "generationId")
             VALUES($1, $2, $3) RETURNING id`,
            [dragon.birthdate, dragon.nickname, dragon.generationId],
            (error, response) => {
                if(error) return reject(error);

                const dragonId = response.rows[0].id;

                Promise.all(dragon.traits.map(({ traitType, traitValue }) => {
                    return DragonTraitTable.storeDragonTrait({ dragonId, traitType, traitValue });
                }))
                    .then(() => {
                        resolve({ dragonId });
                    })
                    .catch((error) => {
                        reject(error);
                    });

            });
        });
    }

    static getDragon({ dragonId }) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT birthdate, nickname, "generationId" 
                        FROM dragon 
                        WHERE dragon.id = $1`,
            [dragonId],
            (error, response) => {
                if(error) return reject(error);

                if(response.rows.length === 0) return reject(new Error(`dragon with id ${dragonId} does not exist`));

                resolve(response.rows[0]);
            });
        });
    }

    static updateDragon({ dragonId, nickname }) {
        return new Promise((resolve, reject) => {
            pool.query(`UPDATE dragon SET nickname = $1 WHERE id = $2`, 
            [nickname, dragonId], 
            (error, response) => {
                if(error) return reject(error);

                resolve();
            })
        })
    }
}

module.exports = DragonTable;