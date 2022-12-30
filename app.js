const express = require('express');
const app = express();
const port = 3000;

const PoolManager = require('./db/PoolManager');
const poolManager = new PoolManager();

const router = require('./controllers/controller');

poolManager.initPostgresPool((err, result) => {
    if(err) {
        console.log('Error while initalizing postgres on demand pool manager. Error => ' + err);
    } else {
        console.log('Pool created in poolmanager')
    }
})

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Cache-Control', 'max-age=3600, must-revalidate');
    next();
});

app.use('/home', router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})