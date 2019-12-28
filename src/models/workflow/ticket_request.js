const { sequelize } = require('../../utils/db')
const { Sequelize, Model } = require('sequelize')

/// 工单请求，工单申请请求

class Ticket_Request extends Model {}

Ticket_Request.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            comment: 'ID'
        },
        title: {
            type: Sequelize.STRING,
            commit: '标题'
        },
        process_id: {
            type: Sequelize.INTEGER,
            commit: '所属流程'
        },
        state_id: {
            type: Sequelize.INTEGER,
            commit: '当前的状态'
        },
        sn: {
            type: Sequelize.STRING,
            commit: '流水号'
        },
        creator: {
            type: Sequelize.INTEGER,
            commit: '创建者'
        },
        executor: {
            type: Sequelize.INTEGER,
            comment: '当前的执行人，可以为空(无处理人的情况，如结束状态)'
        },
        executor_type: {
            type: Sequelize.STRING,
            defaultValue: 'none',
            comment: '当前的执行人类型，none：无处理人，personal：个人，dept：部门，role：角色，script：脚本',
            validate: { isIn: [global.enums.wk._executor_type] }
        },
        participants: {
            type: Sequelize.ARRAY(Sequelize.INTEGER),
            comment: "工单流程的所有参与者，方便查询"
        },
        executors: {
            type: Sequelize.ARRAY(Sequelize.INTEGER),
            comment: "工单流程的所有执行人，方便查询"
        },
        json_data: {
            type: Sequelize.JSON,
            commit: 'json格式数据，用来存储工单流程中产生的所有数据。'
        },
        is_finished: {
            type: Sequelize.BOOLEAN,
            commit: '工单流程是否处于结束状态'
        },
        is_rejected: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            commit: '工单流程是否处于被拒绝状态'
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
        tableName: 'ticket_request'
    }
)

export default Ticket_Request


