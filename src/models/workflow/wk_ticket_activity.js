const { sequelize } = require('../../utils/db')
const { Sequelize, Model } = require('sequelize')

/// 工单活动，工单流程产生的数据

class WK_Ticket_Activity extends Model {}

WK_Ticket_Activity.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'ID'
        },
        ticket_id: {
            type: Sequelize.INTEGER,
            commit: '所属工单'
        },
        state_id: {
            type: Sequelize.INTEGER,
            commit: '所在状态'
        },
        transition_id: {
            type: Sequelize.INTEGER,
            commit: '状态流向'
        },
        creator: {
            type: Sequelize.INTEGER,
            commit: '创建者'
        },
        suggestion: {
            type: Sequelize.STRING,
            commit: '处理意见'
        },
        json_data: {
            type: Sequelize.JSON,
            commit: 'json格式数据，用来存储该状态下产生的数据。'
        },
        executor: {
            type: Sequelize.INTEGER,
            comment: '当前的执行人，可以为空(无处理人的情况，如结束状态)'
        },
        executor_type: {
            type: Sequelize.STRING,
            defaultValue: global.enums.wk.executor_type.none,
            comment: '当前的执行人类型，none：无处理人，personal：个人，multi：多人，dept：部门，role：角色，script：脚本',
            validate: { isIn: [global.enums.wk.executor_types] }
        },
        intervene_type: {
            type: Sequelize.STRING,
            defaultValue: global.enums.wk.executor_type.none,
            comment: '干预类型，none：无干预，deliver：转交操作，add_node：加签操作，add_node_end：加签完毕，comment：评论操作',
            validate: { isIn: [global.enums.wk.intervene_types] }
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
        tableName: 'wk_ticket_activity'
    }
)

export default WK_Ticket_Activity

