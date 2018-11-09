
module.exports = {
    db: {
        database: 'wechat_spider',
        username: 'root',
        password: 'root123',
        options: {
            host: '192.168.99.100',
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
            operatorsAliases: false
        }
    }
}
