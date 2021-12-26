// Routing for the /dragon routes
//
// Imported by the index.js file in the app folder

const {Router} = require('express');
const DragonTable = require('../dragon/table.js');
const AccountDragonTable = require('../accountDragon/table.js');
const { authenticatedAccount } = require('./helper.js');

const router = Router();

router.get("/new", (req, res, next) => {
    let accountId, dragon;

    authenticatedAccount({ sessionString: req.cookies.sessionString })
        .then(({ account }) => {
            accountId = account.id;
            dragon = req.app.locals.generationEngine.generation.newDragon();
            return DragonTable.storeDragon(dragon);
        })
        .then(({ dragonId }) => {
            dragon.id = dragonId;
            return AccountDragonTable.storeAccountDragon({ accountId, dragonId });
        })
        .then(() => res.json({ dragon }))
        .catch((error) => next(error));
});

module.exports = router;