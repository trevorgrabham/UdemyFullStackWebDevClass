const pool = require('../../databasePool.js');
const TraitTable = require('../trait/table.js');

class DragonTraitTable {
    static storeDragonTrait({ dragonId, traitType, traitValue }) {
        return new Promise((resolve, reject) => {
            TraitTable.getTraitId({ traitType, traitValue })
                .then(({ traitId }) => {
                    pool.query(`INSERT INTO dragonTrait("traitId", "dragonId") VALUES($1, $2)`,
                    [traitId, dragonId],
                    (error, response) => {
                        if(error) return reject(error);

                        resolve();
                    });
                })
                .catch((error) => console.error(error));

        });
    }

    static getDragonTraits({ dragonId }) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT "traitType", "traitValue"
                        FROM dragonTrait JOIN trait ON dragonTrait."traitId" = trait.id
                        WHERE dragonTrait."dragonId" = $1`,
            [dragonId],
            (error, response) => {
                if(error) return reject(error);

                if(response.rows.length === 0) return reject(new Error(`dragon with id ${dragonId} does not exist`));

                resolve(response.rows);
            }
            )
        });
    }
}

module.exports = DragonTraitTable;