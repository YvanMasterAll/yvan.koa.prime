const { sequelize } = require('../../utils/db')
const { Sequelize, Model } = require('sequelize')

/// 工单字段，工单流程输入的字段数据
/// TODO: 这张表是否有必要

class Ticket_Field extends Model {}

Ticket_Field.init(
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
        ticket_id: {
            type: Sequelize.INTEGER,
            commit: '所属工单'
        },
        field_key: {
            type: Sequelize.STRING,
            commit: '字段键值，来自WK_Field'
        },
        type: {
            type: Sequelize.STRING,
            defaultValue: 'string',
            comment: '字段类型，string：字符串，int：整形，float：浮点型，bool：布尔，date：日期，radio：单选框，checkbox：多选框，select：下拉列表，text：文本域，user：用户, attachment：附件',
            validate: { isIn: [global.enums.wk._field_type] }
        },
        value: {
            type: Sequelize.STRING,
            comment: '字段数据'
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
        tableName: 'ticket_field'
    }
)

export default Ticket_Field

