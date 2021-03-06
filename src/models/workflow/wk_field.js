const { sequelize } = require('../../utils/db')
const { Sequelize, Model } = require('sequelize')

/// 流程字段，流程中包含的输入字段

class WK_Field extends Model {}

WK_Field.init(
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
        key: {
            type: Sequelize.STRING,
            commit: '字段键值'
        },
        description: {
            type: Sequelize.STRING,
            commit: '描述信息'
        },
        process_id: {
            type: Sequelize.INTEGER,
            commit: '所属流程'
        },
        creator: {
            type: Sequelize.INTEGER,
            commit: '创建者'
        },
        sort: {
            type: Sequelize.INTEGER,
            commit: '字段排序，用于前端展示'
        },
        type: {
            type: Sequelize.STRING,
            defaultValue: global.enums.wk.field_type.string,
            comment: '字段类型，string：字符串，int：整形，float：浮点型，bool：布尔，date：日期，radio：单选框，checkbox：多选框，select：下拉列表，text：文本域，richtext：富文本，user：用户, image：图片，attachment：附件',
            validate: { isIn: [global.enums.wk.field_types] }
        },
        choice: {
            type: Sequelize.JSON,
            comment: '字段预选值，当字段类型为单选框，多选框或是下拉框时不应为空。'
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
        tableName: 'wk_field'
    }
)

export default WK_Field

