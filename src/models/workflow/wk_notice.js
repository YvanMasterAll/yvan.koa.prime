const { sequelize } = require('../../utils/db')
const { Sequelize, Model } = require('sequelize')

/// 流程通知

class WK_Notice extends Model {}

WK_Notice.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'ID'
        },
        name: {
            type: Sequelize.STRING,
            commit: '名称'
        },
        description: {
            type: Sequelize.STRING,
            commit: '描述信息'
        },
        creator: {
            type: Sequelize.INTEGER,
            commit: '创建者'
        },
        script: {
            type: Sequelize.STRING,
            commit: '通知脚本'
        },
        title_template: {
            type: Sequelize.STRING,
            commit: '标题模板'
        },
        content_template: {
            type: Sequelize.STRING,
            commit: '内容模板'
        },
        state: {
            type: Sequelize.STRING,
            defaultValue: 'on',
            comment: '状态',
            validate: { isIn: [global.enums._state] }
        }
    },
    {
        sequelize,
        tableName: 'wk_notice'
    }
)

export default WK_Notice

