var PoolManager = require('../db/PoolManager');

var XMLUtils = require('./xmlUtils');
var xmlUtil = new XMLUtils();

class DatabaseUtility{
    constructor()
    {
        this.poolManager = PoolManager;
    }

    executeQueryAndReturnResponse(xmlPath, queryId, queryParameters, callback)
    {
        var pool = new this.poolManager().getPool();
        const promise = new Promise((resolve, reject) => {
            var query = null;
            xmlUtil.getQueryFromXML(xmlPath, queryId,
                (err, queryFetched) => {
                    if(err)
                    {
                        reject("Unable to find query for query id " + queryId + ". Error => " + err);
                    }
                    else
                    {
                        query = queryFetched;
                    }
                });
            
            pool.any(query, queryParameters)
                .then(result => {
                    resolve(result);
                }, rejection => {
                    reject("Error while executing query " + queryId + ". Rejection=> " + rejection);
                })
                .catch(err => {
                    reject("Error while executing query " + queryId + ". Error => " + err.message);
                });
        })

        promise.then(rows => {
            callback(null, rows);
        }, (rejection) => {
            console.log("Promise rejected => " + rejection);
            return callback(rejection);
        })
        .catch(err=>{
            if(err)
            {
                return callback(err);
            }
        })
    }
}

module.exports = DatabaseUtility;