const pool = require('../../databasePool.js');

class AccountTable {
    static storeAccount({ usernameHash, passwordHash }) {
        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO account("usernameHash", "passwordHash")
                        VALUES ($1, $2) RETURNING id`,
            [usernameHash, passwordHash],
            (error, response) => {
                if(error) return reject(error);

                const accountId = response.rows[0].id;
                resolve({ accountId });
            });
        });
    }
}

module.exports = AccountTable;