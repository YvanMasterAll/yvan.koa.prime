const { sequelize } = require('../../utils/db')
const { Sequelize, Model } = require('sequelize')

/// 工单请求，工单申请请求

class WK_Ticket_Request extends Model {}

WK_Ticket_Request.init(
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
        executors: {
            type: Sequelize.ARRAY(Sequelize.INTEGER),
            comment: '当前的执行人，可以为空(无处理人的情况，如结束状态)'
        },
        executor_type: {
            type: Sequelize.STRING,
            defaultValue: global.enums.wk.executor_type.none,
            comment: '当前的执行人类型，none：无处理人，personal：个人，multi：多人，dept：部门，role：角色，script：脚本',
            validate: { isIn: [global.enums.wk.executor_types] }
        },
        participants: {
            type: Sequelize.ARRAY(Sequelize.INTEGER),
            comment: "记录工单流程的所有参与者，方便查询"
        },
        all_executors: {
            type: Sequelize.ARRAY(Sequelize.INTEGER),
            comment: "记录工单流程的所有执行人，不包含创建者，方便查询"
        },
        multi_executors: {
            type: Sequelize.ARRAY(Sequelize.INTEGER),
            defaultValue: [],
            comment: "记录当前状态下已处理的执行人，用于判断执行状态，仅当执行人类型为多人时有意义"
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
            defaultValue: global.enums.state.on,
            comment: '状态',
            validate: { isIn: [global.enums.state_arr] }
        }
    },
    {
        sequelize,
        tableName: 'wk_ticket_request'
    }
)

export default WK_Ticket_Request


