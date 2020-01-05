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
            defaultValue: 'normal',
            comment: '状态类型，normal：普通类型，start：.初始状态(新建工单)，end：结束状态(此状态下的工单不得再处理)',
            validate: { isIn: [global.enums.wk._state_type] }
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
        fields: {
            type: Sequelize.JSON,
            comment: "json格式数据，存储该状态下各字段的读写属性，0：只读，1：必填，2：可选，示例：{'title': {'attribute': 0, 'show': false}, 'reason': {'attribute': 1, 'show': false}}，未加入的字段代表不显示，其中，show表示字段是否显示，用于前端表格的展示。"
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
        tableName: 'wk_state'
    }
)

export default WK_State

