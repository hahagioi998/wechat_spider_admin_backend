let express = require('express');
let router = express.Router();
let result = require('../lib/result');

router.options('/login', function (req, res) {
    res.sendStatus(204)
})

router.post('/login', function (req, res) {
    res.send(result.success({
        "token": "admin"
    }))
});

router.options('/info', function (req, res) {
    res.sendStatus(204)
})

router.get('/info', function (req, res) {
    res.send(result.success({
        'roles': [
            'admin'
        ],
        'name': 'admin',
        'avatar': 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
    }))
});

router.options('/logout', function (req, res) {
    res.sendStatus(204)
})

router.get('/logout', function (req, res) {
    res.send('respond with a resource');
});

module.exports = router;
