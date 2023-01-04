const express = require('express');
const router = express.Router();
const DatabaseUtility = require('../helpers/dbUtil');
const dbUtils = new DatabaseUtility();

router.get('/azure', (req, res) => {
    const dbPromise = new Promise(function (resolve, reject) {
        dbUtils.executeQueryAndReturnResponse(__dirname + "/Queries/controller.xml", "getData",
            {}, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    console.log(result);
                    resolve(result);
                }
            });
    });

    dbPromise
        .then(function (rows) {
            res.status(200);
            res.send({ data: rows })
        }, rejection => {
            res.status(500);
            res.send({ error: rejection });
        })
        .catch(function (err) {
            console.log(err);
            res.status(500);
            res.send({ error: err.message });
        });
})

module.exports = router;