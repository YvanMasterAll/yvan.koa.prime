const { sequelize } = require('../utils/db')
const { Sequelize, Model } = require('sequelize')

/// 字典数据项

class Dict_Item extends Model {}

Dict_Item.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: 'ID'
        },
        dict_id: {
            type: Sequelize.INTEGER,
            comment: '字典标识'
        },
        label: {
            type: Sequelize.STRING,
            comment: '字典标签'
        },
        value: {
            type: Sequelize.STRING,
            comment: '字典值'
        },
        sort: {
            type: Sequelize.INTEGER,
            comment: '排序',
            defaultValue: 0
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
        comment: '字典数据项',
        tableName: 'dict_item'
    }
)

export default Dict_Item