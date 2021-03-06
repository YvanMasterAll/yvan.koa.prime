const { sequelize } = require('../utils/db')
const { Sequelize, Model } = require('sequelize')
import Dept from './dept'

/// 岗位

class Job extends Model {}

Job.init(
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
        sort: {
            type: Sequelize.INTEGER,
            comment: '排序',
            defaultValue: 999
        },
        dept_id: {
            type: Sequelize.INTEGER, 
            comment: '所属部门'
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
        tableName: 'job'
    }
)

Job.belongsTo(Dept, {foreignKey: 'dept_id', constraints: false})

export default Job