const { Router } = require('express');
const AccountTable = require('../account/table');
const { hash } = require('../account/helper.js');
const Session = require('../account/session.js');
const { setSession } = require('./helper.js');
const pool = require('../../databasePool');

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
    const { sessionString } = req.cookies;
    if(!sessionString || !Session.verify(sessionString)) {
        const error = new Error('Invalid session');
        error.statusCode = 400;
        return next(error);
    } else {
        const { username, id } = Session.parse(sessionString);

        AccountTable.getAccount({ usernameHash: hash(username) })
            .then(({ account }) => {
                const authenticated = account.sessionId === id;
                res.json({ authenticated });
            })
            .catch((error) => next(error));
    }
});

module.exports = router;