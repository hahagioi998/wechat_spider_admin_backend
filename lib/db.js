const Sequelize = require('sequelize');
const config = require('../config');
const moment = require('moment');

const Op = Sequelize.Op;

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, config.db.options);

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    }).catch(err => {
    console.error('Unable to connect to the database:', err)
})

const Post = sequelize.define('Post', {
    fileId: {type: Sequelize.STRING}, //文章id
    newsId: {type: Sequelize.STRING}, //图文id
    biz: Sequelize.STRING, //每个账号的唯有标记，base64
    mid: Sequelize.STRING, //每个账号一个文章的 ID，注意，这里不是全局唯一的，多个账号可能重复
    accountName: Sequelize.STRING, //公众号名称，比如 赤兔金马奖
    author: Sequelize.STRING, //作者名称，比如 金马
    title: Sequelize.STRING,
    cover: Sequelize.STRING,
    contentUrl: {type: Sequelize.STRING},
    contentUrlSign: {type: Sequelize.STRING},
    digest: Sequelize.TEXT,
    idx: Sequelize.INTEGER, //多篇文章的时候的排序，第一篇是 1，第二篇是 2
    sourceUrl: Sequelize.STRING,
    createTime: {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue('createTime')).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    readNum: {type: Sequelize.INTEGER, defaultValue: 0}, //阅读数
    likeNum: {type: Sequelize.INTEGER, defaultValue: 0}, //点赞数
    rewardNum: {type: Sequelize.INTEGER, defaultValue: 0}, //赞赏数
    electedCommentNum: {type: Sequelize.INTEGER, defaultValue: 0}, //选出来的回复数
    updatedAt: {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    createdAt: {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
        }
    },
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
        order: [['createdAt', 'DESC']],
        offset: (parseInt(params.page) - 1) * params.limit,
        limit: parseInt(params.limit)
    })
}

function findMp() {
    return Post.findAll({
        attributes: [
            ['accountName', 'accountName'],
            [sequelize.fn('min', sequelize.col('createdAt')), 'createdAt'],
            [sequelize.fn('max', sequelize.col('updatedAt')), 'updatedAt']
        ],
        where: {
            accountName: {
                [Op.ne]: null
            }
        },
        group: 'accountName'
    })
}

function getMpCounts() {
    return Post.findAll({
        attributes: [
            [sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('accountName'))), 'mpNum'],
            [sequelize.fn('COUNT', sequelize.col('id')), 'mpArticleNum'],
            [sequelize.fn('COUNT', sequelize.col('accountName')), 'mpArticleProcessedNum']
        ]
    })
}

module.exports = {
    find: find,
    findMp: findMp,
    getMpCounts: getMpCounts
};