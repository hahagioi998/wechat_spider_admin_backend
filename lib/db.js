const Sequelize = require('sequelize');
const sequelize = new Sequelize('wechat_spider', 'root', 'root', {
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
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const Post = sequelize.define('Post', {
    biz: Sequelize.STRING, //每个账号的唯有标记，base64
    appmsgid: Sequelize.STRING, //每个账号一个文章的 ID，注意，这里不是全局唯一的，多个账号可能重复
    accountName: Sequelize.STRING, //公众号名称，比如 赤兔金马奖
    author: Sequelize.STRING, //作者名称，比如 金马
    title: Sequelize.STRING,
    cover: Sequelize.STRING,
    contentUrl: { type: Sequelize.STRING, unique: true },
    digest: Sequelize.TEXT,
    idx: Sequelize.INTEGER, //多篇文章的时候的排序，第一篇是 1，第二篇是 2
    sourceUrl: Sequelize.STRING,
    createTime: Sequelize.DATE,
    readNum: { type: Sequelize.INTEGER, defaultValue: 0 }, //阅读数
    likeNum: { type: Sequelize.INTEGER, defaultValue: 0 }, //点赞数
    rewardNum: { type: Sequelize.INTEGER, defaultValue: 0 }, //赞赏数
    electedCommentNum: { type: Sequelize.INTEGER, defaultValue: 0 } //选出来的回复数
}, {
        tableName: 'posts'
});

function find(params) {
    const query = {}

    if (params.accountName)
        query.accountName = params.accountName
    if (params.author)
        query.author = params.author

    return Post.findAndCountAll({
        where: query,
        offset: (parseInt(params.page) - 1) * params.limit,
        limit: parseInt(params.limit)
    })
}

function findMp() {
    return Post.findAll({
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('accountName')),'accountName']]
    })
}

module.exports = {
    find: find,
    findMp: findMp
};