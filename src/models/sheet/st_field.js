const { sequelize } = require('../../utils/db')
const { Sequelize, Model } = require('sequelize')

/// 表格字段

class ST_Field extends Model {}

ST_Field.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: 'ID'
        },
        key: {
            type: Sequelize.STRING,
            comment: '字段标识'
        },
        label: {
            type: Sequelize.STRING,
            comment: '标签'
        },
        value: {
            type: Sequelize.STRING,
            comment: '字段值'
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
        comment: '表格字段',
        tableName: 'st_field'
    }
)

export default ST_Field