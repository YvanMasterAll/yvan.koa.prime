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
            defaultValue: 'on',
            comment: '状态',
            validate: { isIn: global.enums._state }
        }
    },
    {
        sequelize,
        tableName: 'job'
    }
)

Job.belongsTo(Dept, {foreignKey: 'bookid', constraints: false})

export default Job