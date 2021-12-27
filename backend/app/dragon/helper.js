const pool = require('../../databasePool.js');
const DragonTable = require('../dragon/table.js');
const DragonTraitTable = require('../dragonTrait/table.js');
const Dragon = require('./index.js');

const getDragonWithTraits = ({ dragonId }) => {
    return Promise.all([
        DragonTable.getDragon({ dragonId }),
        DragonTraitTable.getDragonTraits({ dragonId })
    ])
        .then(([dragon, dragonTraits]) => {
            return new Dragon({
                ...dragon,
                id: dragonId,
                traits: dragonTraits
            })
        })
        .catch((error) => console.error(error));
}

const getPublicDragons = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT "id" FROM dragon WHERE "isPublic" = TRUE`,
        (error, response) => {
            if(error) return reject(error);

            const publicDragonRows = response.rows;

            Promise.all(publicDragonRows.map(({ id }) => getDragonWithTraits({ dragonId: id })))
                .then((dragons) => resolve({ dragons }))
                .catch((error) => reject(error));
        })
    })
}

module.exports = { getDragonWithTraits, getPublicDragons };