// A container class for functions that will allow us to query 
// our dragon db

const pool = require('../../databasePool.js');
const DragonTraitTable = require('../dragonTrait/table.js');

class DragonTable {
    static storeDragon(dragon) {
        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO dragon(birthdate, nickname, "generationId", "isPublic", "saleValue")
             VALUES($1, $2, $3, $4, $5) RETURNING id`,
            [dragon.birthdate, dragon.nickname, dragon.generationId, dragon.isPublic, dragon.saleValue],
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
            pool.query(`SELECT birthdate, nickname, "generationId", "isPublic", "saleValue" 
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

    static updateDragon({ dragonId, nickname, isPublic, saleValue }) {
        const settingsMap = { nickname, isPublic, saleValue };

        const validQueries = Object.entries(settingsMap).filter(([settingKey, settingValue]) => {
            if(settingValue !== undefined) {
                return new Promise((resolve, reject) => {
                    pool.query(`UPDATE dragon SET "${settingKey}" = $1 WHERE id = $2`,
                    [settingValue, dragonId],
                    (error, response) => {
                        if(error) return reject(error);

                        resolve();
                    });
                });
            }
        })

        return Promise.all(validQueries);
    }
}

module.exports = DragonTable;