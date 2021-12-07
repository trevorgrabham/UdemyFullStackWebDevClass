// Routing for the /dragon routes
//
// Imported by the index.js file in the app folder

const {Router} = require('express');
const DragonTable = require('../dragon/table.js');
const DragonTraitTable = require('../dragonTrait/table.js');

const router = Router();

router.get("/new", (req, res, next) => {
    const dragon = req.app.locals.generationEngine.generation.newDragon();

    DragonTable.storeDragon(dragon)
    .then(({ dragonId }) => {
        dragon.id = dragonId;

        dragon.traits.forEach(({ traitType, traitValue }) => {
            DragonTraitTable.storeDragonTrait(dragon.id, traitType, traitValue)
                .then(({}) => {
                    console.log(`stored traitType: ${traitType},
                    traitValue: ${traitValue}, dragonId: ${dragon.id}`);
                })
                .catch((error) => console.error(error));
        });

        console.log('new dragon being created');
        console.log('new dragon', dragon);

        res.json({ dragon: dragon });
    })
    .catch((error) => {
        next(error);
    });


});

module.exports = router;