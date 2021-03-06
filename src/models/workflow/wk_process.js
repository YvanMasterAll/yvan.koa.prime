const { sequelize } = require('../../utils/db')
const { Sequelize, Model } = require('sequelize')

/// 工作流流程

class WK_Process extends Model {}

WK_Process.init(
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
        notices: {
            type: Sequelize.ARRAY(Sequelize.TEXT),
            commit: '通知类型，是一个数组'
        },
        state: {
            type: Sequelize.STRING,
            defaultValue: global.enums.state.on,
            comment: '状态',
            validate: { isIn: [global.enums.state_arr] }
        }
    },
    {
        sequelize,
        tableName: 'wk_process'
    }
)

export default WK_Process

