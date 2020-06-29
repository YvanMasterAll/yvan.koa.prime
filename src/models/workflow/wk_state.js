const { sequelize } = require('../../utils/db')
const { Sequelize, Model } = require('sequelize')

/// 流程状态，流程中每个过程代表的状态

class WK_State extends Model {}

WK_State.init(
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
        is_hidden: {
            type: Sequelize.BOOLEAN,
            commit: '是否隐藏状态，如果该状态未被激活将不显示，用于前端展示'
        },
        sort: {
            type: Sequelize.INTEGER,
            commit: '状态排序，用于前端展示，因为存在网状情况，所以需要人为设定顺序，值越小越靠前'
        },
        type: {
            type: Sequelize.STRING,
            defaultValue: global.enums.wk.state_type.normal,
            comment: '状态类型，normal：普通类型，start：.初始状态(新建工单)，end：结束状态(此状态下的工单不得再处理)',
            validate: { isIn: [global.enums.wk.state_types] }
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
        distribute_type: {
            type: Sequelize.STRING,
            defaultValue: global.enums.wk.distribute_type.direct,
            comment: '分发类型，direct：直接处理(每个执行人都可以处理工单并进入下一状态)，all：全部处理(只有当所有执行人处理完工单才能进入下一个状态)',
            validate: { isIn: [global.enums.wk.distribute_types] }
        },
        fields: {
            type: Sequelize.JSON,
            comment: "json格式数据，存储该状态下各字段的读写属性，0：只读，1：必填，2：可选，示例：{'title': {'attribute': 0, 'show': false}, 'reason': {'attribute': 1, 'show': false}}，未加入的字段代表不显示，其中，show表示字段是否显示，用于前端表格的展示。"
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
        tableName: 'wk_state'
    }
)

export default WK_State

