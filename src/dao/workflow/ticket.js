import { Ticket_Activity, Ticket_Field, Ticket_Request, WK_State, WK_Transition } from '../../models'
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const { doTransaction } = require('../../utils/db')
import { WK_CommonDao, UserDao } from '../../dao'

class TicketDao {

    /// 新建工单
    static async ticket_add(fields, start_state, target_state, process_id, transition_id, userid, suggestion) {
        // 开始事务
        await doTransaction(async function(transaction) {
            // 创建工单
            let ticket = new Ticket_Request()
            ticket.title = fields['title']
            ticket.process_id = process_id
            ticket.state_id = target_state.id
            ticket.creator = userid
            ticket.executor = target_state.executor
            ticket.executor_type = target_state.executor_type
            ticket.json_data = fields
            ticket.participants = [userid]
            ticket.executors = []
            if (target_state.type === global.enums.wk.state_type.end) {
                ticket.is_finished = true   
            } else {
                ticket.is_finished = false
            }
            await ticket.save(transaction).then(async function(r) {
                let id = r.id
                // 添加工单活动
                let activity = new Ticket_Activity()
                activity.ticket_id = id
                activity.state_id = start_state.id
                activity.transition_id = transition_id
                activity.creator = userid
                activity.suggestion = suggestion
                activity.json_data = fields
                activity.executor = userid
                activity.executor_type = global.enums.wk.executor_type.personal
                activity.intervene_type = global.enums.wk.intervene_type.normal
                await activity.save()
            })
        }, () => { throw new global.errs.DBError("数据库操作异常") })
    }

    /// 添加Transition
    static async transition_add(ticket, fields, current_state, target_state, transition_id, userid, suggestion) {
        // 合并字段，将新增的字段合并到json数据中
        let json_data = ticket.json_data
        for (var key in fields) {
            json_data[key] = fields[key] // 更新字段
        }
        // 添加执行人
        let executors = ticket.executors
        if (ticket.executor_type !== global.enums.wk.executor_type.none) {
            executors.push(userid)
        }
        // 判断工单是否结束
        let is_finished = false
        if (target_state.type === global.enums.wk.state_type.end) {
            is_finished = true   
        } else {
            is_finished = false
        }
        // 添加参与者
        ticket.participants.push(userid)
        // 开始事务
        await doTransaction(async function(transaction) {
            // 更新工单
            await Ticket_Request.update({
                state_id: target_state.id,
                executor: target_state.executor,
                executor_type: target_state.executor_type,
                participants: ticket.participants,
                json_data, executors, is_finished
            }, { where: { id: ticket.id }, transaction })
            // 添加工单活动
            let activity = new Ticket_Activity()
            activity.ticket_id = ticket.id
            activity.state_id = current_state.id
            activity.transition_id = transition_id
            activity.creator = ticket.creator
            activity.suggestion = suggestion
            activity.json_data = fields
            activity.executor = userid
            activity.executor_type = global.enums.wk.executor_type.personal
            activity.intervene_type = global.enums.wk.intervene_type.normal
            await activity.save()
        }, () => { throw new global.errs.DBError("数据库操作异常") })
    }

     /// 判断工单存在
     static async ticket_exists(id) {
        let count = await Ticket_Request.count({
            where: { ...global.enums.where, id: id }
        })
        return (count > 0)
    }

    /// 验证用户是否有查看工单详情的权限
    static validate_ticketinfo(id, ticket, isadmin, perms, roleids, dept_id) {
        // 1.判断用户是否是工单创建者(我发布的工单)
        if (ticket.creator === id) {
            return true
        }
        // 2.判断用户是否是管理员或者具备工单查询的权限(所有工单列表)
        if (isadmin || UserDao.isTicketManager(perms)) {
            return true
        }
        // 3.判断用户是否具有工单处理的权限并且参与到该工单的执行(我处理的工单)
        if (UserDao.isTicketExecutor(perms) && ticket.executors.includes(id)) {
            return true
        }
        // 4.判断用户是否具有工单处理的权限并且是该工单当前状态的执行人(待处理的工单)
        if (UserDao.isTicketExecutor(perms)) {
            if (ticket.executor_type === global.enums.wk.executor_type.personal && ticket.executor === id) { // 个人
                return true
            }
            if (ticket.executor_type === global.enums.wk.executor_type.dept && ticket.executor === dept_id) { // 部门
                return true
            }
            if (ticket.executor_type === global.enums.wk.executor_type.role && roleids.filter(r => r === ticket.executor).length > 0) { // 角色
                return true
            }
        }

        return false
    }

    /// 验证用户是否具有执行工单的权力
    static validate_transition(ticket, id, dept_id, perms, roleids) {
        let creator = ticket.creator
        let executor = ticket.executor
        let executor_type = ticket.executor_type
        if (executor_type === global.enums.wk.executor_type.none && creator === id) { // 创建者
            return true
        }
        if (UserDao.isTicketExecutor(perms)) {
            if (executor_type === global.enums.wk.executor_type.personal && executor === id) { // 执行人
                return true
            }
            if (executor_type === global.enums.wk.executor_type.dept && executor === dept_id) { // 执行部门
                return true
            }
            if (executor_type === global.enums.wk.executor_type.role && roleids.filter(r => r === executor).length > 0) { // 执行角色
                return true
            }
        }

        return false
    }

    /// 获取工单和当前状态
    static async ticket_state(where) {
        let ticket = await Ticket_Request.findOne({
            include: [{
                association: Ticket_Request.hasOne(WK_State, {foreignKey: 'id', sourceKey: 'state_id', constraints: false}),
                required: true,
                where: { ...global.enums.where }
            }], where: {
                ...global.enums.where,
                ...where
            }
        })
        
        return ticket
    }

    /// 获取工单信息
    static async ticket_info(id) {
        let ticket = await Ticket_Request.findOne({
            include: [{
                association: Ticket_Request.hasOne(WK_State, {foreignKey: 'id', targetKey: 'state_id', constraints: false}),
                required: true,
                include: [{
                    association: WK_State.hasMany(WK_Transition, {foreignKey: 'source_state', targetKey: 'id', constraints: false}),
                    required: true,
                    where: { ...global.enums.where }
                }],
                where: { ...global.enums.where }
            }, {
                association: Ticket_Request.hasMany(WK_State, {foreignKey: 'process_id', targetKey: 'process_id', constraints: false}),
                required: true,
                where: { ...global.enums.where }
            }], where: { ...global.enums.where, id: id }
        })
        if (ticket) {
            return ticket.toJSON()
        }
        
        return null
    }

    /// 获取工单
    static async ticket(where) {
        let ticket = await Ticket_Request.findOne({
            where: { ...global.enums.where, ...where }
        })
        if (ticket) {
            return ticket.toJSON()
        }
        
        return null
    }

    /// 获取工单活动列表
    static async activity_list(where, ctx) {
        let result = (await Ticket_Activity.findAndCountAll({
            where: { ...global.enums.where, ...where },
            offset: ctx.limit*ctx.pagenum,
            limit: ctx.limit,
            // distinct: true // 只计算主表数量，注意如果只查询一张表，不需要加该属性
        }))
        let count = result.count
        let results = result.rows.map(d => { return d.toJSON() })
        
        return {results, count}
    }

    /// 获取工单列表
    static async ticket_list(where, ctx) {
        let result = (await Ticket_Request.findAndCountAll({
            where: { ...global.enums.where, ...where },
            offset: ctx.limit*ctx.pagenum,
            limit: ctx.limit,
            // distinct: true // 只计算主表数量，注意如果只查询一张表，不需要加该属性
        }))
        let count = result.count
        let results = result.rows.map(d => { return d.toJSON() })
        
        return {results, count}
    }

    /// 待处理的工单
    static async ticket_stay_list(where, userid, dept_id, roleids, ctx) {
        let result = (await Ticket_Request.findAndCountAll({
            include: [{
                association: Ticket_Request.hasOne(WK_State, {foreignKey: 'id', sourceKey: 'state_id', constraints: false}),
                required: true,
                where: { 
                    ...global.enums.where,
                    [Op.or]: [ // 查询当前状态的执行人
                        {
                            [Op.and]: [{ executor_type: global.enums.wk.executor_type.dept }, { executor: dept_id }]
                        }, {
                            [Op.and]: [{ executor_type: global.enums.wk.executor_type.personal }, { executor: userid }]
                        }, {
                            [Op.and]: [{ executor_type: global.enums.wk.executor_type.role }, { executor: { [Op.in]: roleids }}]
                        },
                    ]
                }
            }], where: { ...global.enums.where, ...where },
            offset: ctx.limit*ctx.pagenum,
            limit: ctx.limit,
            distinct: true // 只计算主表数量
        }))
        let count = result.count
        let results = result.rows.map(d => { return d.toJSON() })
        
        return {results, count}
    }
}

export default TicketDao
