const { sequelize } = require('../../utils/db')
const { Sequelize, Model } = require('sequelize')

/// 表格模板

class ST_Sheet_Tmpl extends Model {}

ST_Sheet_Tmpl.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: 'ID'
        },
        title: {
            type: Sequelize.STRING,
            comment: '名称'
        },
        template: {
            type: Sequelize.TEXT,
            comment: '模板数据'
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
        comment: '表格模板',
        tableName: 'st_sheet_tmpl'
    }
)

export default ST_Sheet_Tmpl