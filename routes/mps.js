let express = require('express');
let router = express.Router();
let result = require('../lib/result');
let db = require('../lib/db');

router.get('', function (req, res) {
    db.findMp(req.query).then(function (data) {
        res.send(result.success(data));
    });
});

module.exports = router;
