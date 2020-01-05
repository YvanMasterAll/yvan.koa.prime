const { sequelize } = require('../../utils/db')
const { Sequelize, Model } = require('sequelize')

/// 流程流转，触发状态转变的Action(动作)

class WK_Transition extends Model {}

WK_Transition.init(
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
        process_id: {
            type: Sequelize.INTEGER,
            commit: '所属流程'
        },
        creator: {
            type: Sequelize.INTEGER,
            commit: '创建者'
        },
        source_state: {
            type: Sequelize.INTEGER,
            commit: '源状态'
        },
        target_state: {
            type: Sequelize.INTEGER,
            commit: '目标状态'
        },
        type: {
            type: Sequelize.STRING,
            defaultValue: 'normal',
            comment: '流转类型，normal：常规流转。',
            validate: { isIn: [global.enums.wk._transition_type] }
        },
        action_type: {
            type: Sequelize.STRING,
            defaultValue: 'accept',
            comment: '动作类型，accept：同意，deny：拒绝。',
            validate: { isIn: [global.enums.wk._action_type] }
        },
        script_type: {
            type: Sequelize.STRING,
            defaultValue: global.enums.wk.script_type.none.name,
            comment: '脚本类型，指定该流转需要执行的脚本，实现额外的逻辑。',
            validate: { isIn: [Object.values(global.enums.wk.script_type).map(d => d.name)] }
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
        tableName: 'wk_transition'
    }
)

export default WK_Transition

