const uuid = require('uuid/v4');
const { hash } = require('./helper.js');

class Session {
    constructor({ username }) { 
        this.username = username;
        this.id = uuid();
    }

    toString() {
        const { username, id } = this;
        
        return Session.sessionString({ username, id });
    }

    static accountData({ username, id}) {
        return `${username}|${id}`;
    }

    static sessionString({ username, id}) {
        const accountData = Session.accountData({ username, id });

        return `${accountData}|${hash(accountData)}`
    }
}

module.exports = Session;