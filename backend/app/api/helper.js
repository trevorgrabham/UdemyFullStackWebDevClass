const Session = require('../account/session.js');
const AccountTable = require('../account/table.js');
const { hash } = require('../account/helper.js');

const setSession = ({ username, res, sessionId }) => {
    return new Promise((resolve, reject) => {
        let sessionString;
        
        if(sessionId) {
            sessionString = Session.sessionString({ username, id: sessionId });
            setSessionCookie({ sessionString, res });

            resolve({ message: `Session restored for ${username}`});
        } else {
            const session = new Session({ username });
            sessionString = session.toString();
            AccountTable.updateSessionId({ 
                sessionId: session.id, 
                usernameHash: hash(username) 
            })
            .then(() => {
                setSessionCookie({ sessionString, res });
                resolve({ message: `Session created for ${username}`})
            })
            .catch((error) => reject(error));
        }

    });
}

const setSessionCookie = ({ sessionString, res }) => {
    res.cookie('sessionString', sessionString, {
        expire: Date.now() + 3600000,           // expires in 1 hour
        httpOnly: true,
        //secure: true                          // should be used with https
    });
}

module.exports = { setSession };