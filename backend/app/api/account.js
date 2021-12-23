const { Router } = require('express');
const AccountTable = require('../account/table');

const router = new Router();

router.post('/signup', (req, res, next) => {
    const { username, password } = req.body;

    AccountTable.storeAccount({ username, password })
        .then(({ accountId }) => {
            res.json({ message: `Successfully created account for user ${username} with accountId ${accountId}`})
        })
        .catch((error) => console.error(error));
});

module.exports = router;