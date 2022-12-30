const pgp = require('pg-promise')({
    capSQL:true
})

class PoolManager {
    constructor() {
        if(PoolManager._instance)
        {
            return PoolManager._instance;
        }
        PoolManager._instance = this;
        this.config = null;
        this.pool = null;
        this.connectionConfig = null;
    }

    initPostgresPool(callback) {
        const db = 'postgres://apollo:{your_password}@cvf-personal-server.postgres.database.azure.com/postgres?sslmode=require'
        try {
            this.connectionConfig = {
                user: 'apollo',
                password: 'Weddington13',
                host: 'cvf-personal-server.postgres.database.azure.com',
                database: 'postgres',
                port: 5432,
                max: 100,
                connectionTimeoutMillis: 3000000,
                idleTimeoutMillis: 3000000,
                ssl: true
            };

            this.pool = pgp(this.connectionConfig);

            if(this.pool) {
                console.log('pool created in pool manager');
                callback("");
            }
        }
        catch(err) {
            console.error('init() error: ' + err.message);
            this.closePool();
            return callback("Error while creating pool, error" + err.message);
        }
        finally {
            console.log('done init')
        }
    }

    closePool(callback) {
        try {
            console.log('inside pool end')
            if(this.pool!=null) {
                callback();
            } else {
                callback();
            }
        }
        catch(err) {
            console.error(err.message);
        }
    }

    getPool() {
        return this.pool;
    }

    getConnectionConfig() {
        return this.connectionConfig;
    }
}

module.exports = PoolManager;