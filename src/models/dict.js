const { sequelize } = require('../utils/db')
const { Sequelize, Model } = require('sequelize')

/// 字典

class Dict extends Model {}

Dict.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: 'ID'
        },
        name: {
            type: Sequelize.STRING,
            comment: '名称'
        },
        description: {
            type: Sequelize.STRING,
            comment: '描述'
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
        comment: '数据字典',
        tableName: 'dict'
    }
)

export default Dict