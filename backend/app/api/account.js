const { Router } = require('express');
const AccountTable = require('../account/table');
const { hash } = require('../account/helper.js');

const router = new Router();

router.post('/signup', (req, res, next) => {
    const { username, password } = req.body;
    const usernameHash = hash(username);
    const passwordHash = hash(password);

    AccountTable.storeAccount({ usernameHash, passwordHash })
        .then(({ accountId }) => {
            res.json({ message: `Successfully created account for user ${username} with accountId ${accountId}`})
        })
        .catch((error) => console.error(error));
});

module.exports = router;