module.exports = {
    db: {
        database: 'wechat_spider',
        username: 'root',
        password: 'root123',
        options: {
            host: 'localhost',
            dialect: 'mysql',
            pool: {
                max: 50,
                min: 5,
                acquire: 30000,
                idle: 10000
            },
            timezone: '+08:00',
            define: {
                charset: 'utf8',
                dialectOptions: {
                    collate: 'utf8_general_ci'
                }
            },
            // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
            operatorsAliases: false
        }
    }
}
