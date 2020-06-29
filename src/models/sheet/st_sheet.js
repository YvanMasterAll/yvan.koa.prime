const { sequelize } = require('../../utils/db')
const { Sequelize, Model } = require('sequelize')

/// 表格数据项

class ST_Sheet extends Model {}

ST_Sheet.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: 'ID'
        },
        tmpl_id: {
            type: Sequelize.INTEGER,
            comment: '模板ID'
        },
        sn: {
            type: Sequelize.STRING,
            comment: '设备序列号'
        },
        sn2: {
            type: Sequelize.STRING,
            comment: '设备序列号2'
        },
        title: {
            type: Sequelize.STRING,
            comment: '表格标题'
        },
        company: {
            type: Sequelize.STRING,
            comment: '公司'
        },
        data: {
            type: Sequelize.TEXT,
            comment: '数据'
        },
        date: {
            type: Sequelize.STRING,
            comment: '日期'
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
        comment: '表格数据项',
        tableName: 'st_sheet'
    }
)

export default ST_Sheet