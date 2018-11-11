let express = require('express');
let router = express.Router();
let result = require('../lib/result');
let db = require('../lib/db');

router.get('', function (req, res) {
    db.findMp(req.query).then(function (data) {
        res.send(result.success(data));
    });
});

router.get('/counts', function (req, res) {
    db.getMpCounts(req.query).then(function (data) {
        res.send(result.success(data));
    });
});

module.exports = router;
