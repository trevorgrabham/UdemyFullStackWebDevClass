const { Router } = require('express');
const AccountTable = require('../account/table');
const { hash } = require('../account/helper.js');
const Session = require('../account/session.js');

const router = new Router();

router.post('/signup', (req, res, next) => {
    const { username, password } = req.body;
    const usernameHash = hash(username);
    const passwordHash = hash(password);

    AccountTable.getAccount({ usernameHash })
        .then(({ account }) => {
            if(!account) {
                return AccountTable.storeAccount({ usernameHash, passwordHash })
            } else {
                const error = new Error('This username has already been taken');
                error.statusCode = 409;
                throw error;
            }
        })
        .then(({ accountId }) => {
            const session = new Session({ username });
            const sessionString = session.toString();

            res.cookie('sessionString', sessionString, {
                expire: Date.now() + 3600000,           // expires in 1 hour
                httpOnly: true,
                //secure: true                          // should be used with https
            });

            res.json({ message: `Successfully created account for user ${username} with accountId ${accountId}`})
        })
        .catch((error) => next(error))

});

module.exports = router;