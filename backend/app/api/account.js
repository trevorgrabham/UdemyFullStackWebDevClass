const { Router } = require('express');
const AccountTable = require('../account/table');
const AccountDragonTable = require('../accountDragon/table.js');
const { hash } = require('../account/helper.js');
const Session = require('../account/session.js');
const { setSession, authenticatedAccount } = require('./helper.js');
const { getDragonWithTraits } = require('../dragon/helper.js');

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
        .then(() => {
            return setSession({ username, res })
        })
        .then(({ message }) => {
            res.json({ message })
        })
        .catch((error) => next(error))

});

router.post('/login', (req, res, next) => {
    const { username, password } = req.body;

    AccountTable.getAccount({ usernameHash: hash(username)})
        .then(({ account }) => {
            if(account && account.passwordHash === hash(password)) {
                return setSession({ username, res, sessionId: account.sessionId });
            } else {
                const error = new Error ('Incorrect username/password');
                error.statusCode = 409;
                throw error;
            }
        })
        .then(({ message }) => res.json({ message }))
        .catch((error) => next(error));
});

router.get('/logout', (req, res, next) => {
    const { username } = Session.parse(req.cookies.sessionString);

    AccountTable.updateSessionId({
        sessionId: null,
        usernameHash: hash(username)
    })
    .then(() => {
        res.clearCookie('sessionString');
        res.json({ message: `${username} successfully logged out`});
    })
    .catch((error) => next(error));
});

router.get('/authenticated', (req, res, next) => {
    authenticatedAccount({ sessionString: req.cookies.sessionString })
        .then(({ authenticated }) => {
            res.json({ authenticated });
        })
        .catch((error) => next(error));
});

router.get('/dragons', (req, res, next) => {
    authenticatedAccount({ sessionString: req.cookies.sessionString })
        .then(({ account }) => {
            return AccountDragonTable.getAccountDragons({ accountId: account.id });
        })
        .then(({ accountDragons }) => {
            return Promise.all(
                accountDragons.map((accountDragon) => {
                    return getDragonWithTraits({ dragonId: accountDragon.dragonId });
                })
            );
        })
        .then((dragons) => {
            res.json({ dragons });
        })
        .catch((error) => next(error));
});

router.get('/info', (req, res, next) => {
    authenticatedAccount({ sessionString: req.cookies.sessionString })
        .then(({ account, username }) => {
            res.json({ info: { balance: account.balance, username } });
        })
        .catch((error) => next(error));
});

module.exports = router;