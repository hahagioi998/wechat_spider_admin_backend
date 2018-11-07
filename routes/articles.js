let express = require('express');
let router = express.Router();
let result = require('../lib/result');
let db = require('../lib/db');

/* GET articles listing. */
router.get('', function (req, res) {
    console.log(req.query)
    db.find(req.query).then(function (data) {
        res.send(result.success(data));
    });
});

module.exports = router;
