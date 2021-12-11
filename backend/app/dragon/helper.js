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

module.exports = {getDragonWithTraits};