import { Ticket_Activity, Ticket_Field, Ticket_Request, WK_State, WK_Transition, User, WK_Process, Permission, Role, Roles_Permissions, Users_Roles } from '../../models'
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const { doTransaction } = require('../../utils/db')
import { WK_CommonDao, UserDao } from '../../dao'
import utils from '../../utils'
import moment from 'moment'

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
    static async transition_add(ticket, fields, current_state, target_state, transition, userid, suggestion) {
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
        // 判断工单是否结束以及工单结束状态
        let is_finished = false
        let is_rejected = false
        if (target_state.type === global.enums.wk.state_type.end) {
            if (transition.action_type === global.enums.wk.action_type.deny) {
                is_rejected = true
            }
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
                json_data, executors, is_finished, is_rejected
            }, { where: { id: ticket.id }, transaction })
            // 添加工单活动
            let activity = new Ticket_Activity()
            activity.ticket_id = ticket.id
            activity.state_id = current_state.id
            activity.transition_id = transition.id
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
            if (ticket.executor_type === global.enums.wk.executor_type.none) {
                ticket.is_executor = true // 执行人判断
            }
            return true
        }
        // 2.判断用户是否具有工单处理的权限并且是该工单当前状态的执行人(待处理的工单)
        if (UserDao.isTicketExecutor(perms, isadmin)) {
            if (ticket.executor_type === global.enums.wk.executor_type.personal && ticket.executor === id) { // 个人
                ticket.is_executor = true // 执行人判断
                return true
            }
            if (ticket.executor_type === global.enums.wk.executor_type.dept && ticket.executor === dept_id) { // 部门
                ticket.is_executor = true // 执行人判断
                return true
            }
            if (ticket.executor_type === global.enums.wk.executor_type.role && roleids.filter(r => r === ticket.executor).length > 0) { // 角色
                ticket.is_executor = true // 执行人判断
                return true
            }
        }
        // 3.判断用户是否具有工单处理的权限并且参与到该工单的执行(我处理的工单)
        if (UserDao.isTicketExecutor(perms, isadmin) && ticket.executors.includes(id)) {
            return true
        }
        // 4.判断用户是否是管理员或者具备工单查询的权限(所有工单列表)
        if (UserDao.isTicketManager(perms, isadmin)) {
            return true
        }

        return false
    }

    /// 验证用户是否具有执行工单的权力
    static validate_transition(ticket, id, dept_id, perms, roleids, isadmin) {
        let creator = ticket.creator
        let executor = ticket.executor
        let executor_type = ticket.executor_type
        if (executor_type === global.enums.wk.executor_type.none && creator === id) { // 创建者
            return true
        }
        if (UserDao.isTicketExecutor(perms, isadmin)) {
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
            }, order: [[WK_State, 'sort']]
        })
        
        return ticket
    }

    /// 获取工单信息
    static async ticket_info(id) {
        let ticket = await Ticket_Request.findOne({
            include: [{
                association: Ticket_Request.hasOne(WK_State, {foreignKey: 'id', sourceKey: 'state_id', constraints: false}),
                required: true,
                include: [{
                    association: WK_State.hasMany(WK_Transition, {foreignKey: 'source_state', sourceKey: 'id', constraints: false}),
                    required: false,
                    where: { ...global.enums.where }
                }],
                where: { ...global.enums.where }
            }, {
                association: Ticket_Request.hasMany(WK_State, {foreignKey: 'process_id', sourceKey: 'process_id', constraints: false}),
                required: true,
                where: { ...global.enums.where }
            }], where: { ...global.enums.where, id: id }, order: [['WK_States', 'sort']]
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
            include: [{
                association: Ticket_Activity.hasOne(WK_State, {foreignKey: 'id', sourceKey: 'state_id', constraints: false}),
                required: true,
                attributes: ['name'],
                where: { ...global.enums.where }
            }, {
                association: Ticket_Activity.hasOne(WK_Transition, {foreignKey: 'id', sourceKey: 'transition_id', constraints: false}),
                required: true,
                attributes: ['name', 'action_type'],
                where: { ...global.enums.where }
            }, {
                association: Ticket_Activity.hasOne(User, {foreignKey: 'id', sourceKey: 'executor', constraints: false}),
                required: true,
                attributes: ['name'],
                where: { ...global.enums.where }
            }], where: { ...global.enums.where, ...where },
            order: [['created_at', 'DESC']],
            offset: ctx.limit*ctx.pagenum,
            limit: ctx.limit,
            distinct: true // 只计算主表数量，注意如果只查询一张表，不需要加该属性
        }))
        let count = result.count
        let results = result.rows.map(d => { 
            d = d.toJSON()
            d.executor_name = d.User.name
            d.transition_name = d.WK_Transition.name
            d.state_name = d.WK_State.name
            d.action_type = d.WK_Transition.action_type
            return d
        })
        
        return {results, count}
    }

    /// 获取工单列表
    static async ticket_list(where, ctx) {
        let result = (await Ticket_Request.findAndCountAll({
            include: [{
                association: Ticket_Request.hasOne(WK_State, {foreignKey: 'id', sourceKey: 'state_id', constraints: false}),
                required: true,
                attributes: ['name'],
                where: { ...global.enums.where }
            }, {
                association: Ticket_Request.hasOne(WK_Process, {foreignKey: 'id', sourceKey: 'process_id', constraints: false}),
                required: true,
                attributes: ['name'],
                where: { ...global.enums.where }
            }, {
                association: Ticket_Request.hasOne(User, {foreignKey: 'id', sourceKey: 'creator', constraints: false}),
                required: true,
                attributes: ['name'],
                where: { ...global.enums.where }
            }], where: { ...global.enums.where, ...where },
            order: [['created_at', 'DESC']],
            offset: ctx.limit*ctx.pagenum,
            limit: ctx.limit,
            distinct: true // 只计算主表数量，注意如果只查询一张表，不需要加该属性
        }))
        let count = result.count
        let results = result.rows.map(d => {
            let _d = d.toJSON()
            _d.creator_name = _d.User.name
            _d.state_name = _d.WK_State.name
            _d.process_name = _d.WK_Process.name
            return _d
        })
        
        return {results, count}
    }

    /// 待处理的工单
    static async ticket_stay_list(where, userid, dept_id, roleids, ctx) {
        let result = (await Ticket_Request.findAndCountAll({
            include: [{
                association: Ticket_Request.hasOne(WK_State, {foreignKey: 'id', sourceKey: 'state_id', constraints: false}),
                required: true,
                attributes: ['name'],
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
            }, {
                association: Ticket_Request.hasOne(WK_Process, {foreignKey: 'id', sourceKey: 'process_id', constraints: false}),
                required: true,
                attributes: ['name'],
                where: { ...global.enums.where }
            }, {
                association: Ticket_Request.hasOne(User, {foreignKey: 'id', sourceKey: 'creator', constraints: false}),
                required: true,
                attributes: ['name'],
                where: { ...global.enums.where }
            }], where: { ...global.enums.where, ...where },
            order: [['created_at', 'DESC']],
            offset: ctx.limit*ctx.pagenum,
            limit: ctx.limit,
            distinct: true // 只计算主表数量
        }))
        let count = result.count
        let results = result.rows.map(d => {
            let _d = d.toJSON()
            _d.creator_name = _d.User.name
            _d.state_name = _d.WK_State.name
            _d.process_name = _d.WK_Process.name
            return _d
        })
        
        return {results, count}
    }

    /// 构建查询条件
    static async where_ticket(ctx) {
        let where = {}
        // 读取参数
        let process_id = ctx.request.query.process_id*1
        let creator_name = ctx.request.query.creator_name
        let executor_id = ctx.request.query.executor_id*1
        let created_start = ctx.request.query.created_start
        let created_end = ctx.request.query.created_end
        
        if (process_id) { where.process_id = process_id }
        if (creator_name) { // 查询用户
            let user_ids = (await User.findAll({
                attributes: ['id'],
                where: {
                    name: {
                        [Op.like]: creator_name + '%'
                    }
                }
            })).map(d => d.toJSON().id)
            if (user_ids.length > 0) {
                where.creator = {[Op.in]: user_ids}
            }
        }
        if (executor_id) { // 查询用户
            where.executors = {[Op.contains]: [executor_id] }
        }
        if (created_start && utils.isDateString(created_start)) { created_start = utils.toDate(created_start) } else if (created_start) { throw new global.errs.ParamsIllegal() }
        if (created_end && utils.isDateString(created_end)) { created_end = utils.toDate(created_end) } else if (created_end) { throw new global.errs.ParamsIllegal() }
        if (created_start && created_end) {
            where.created_at = {[Op.between]: [created_start, created_end]}
        } else if (created_start) {
            where.created_at = {[Op.gte]: created_start}
        } else if (created_end) {
            where.created_at = {[Op.lte]: created_end}
        }

        return where
    }

    /// 获取具备工单处理能力的人
    static async ticket_executors() {
        let users = (await User.findAll({
            attributes: ['id', 'name'],
            include: [{
                attributes: ['id'],
                association: User.belongsToMany(Role, {through: Users_Roles, foreignKey: 'user_id', constraints: false}),
                required: true,
                include: [{
                    attributes: ['id'],
                    association: Role.belongsToMany(Permission, {through: Roles_Permissions, foreignKey: 'role_id', constraints: false}),
                    required: true,
                    where: { 
                        ...global.enums.where,
                        id: {[Op.in]: [1, 61]} // TODO: 这里直接判断用户权限是否包含工单处理(61)和管理员(1)即为工单执行人
                    }
                }],
                where: { ...global.enums.where }
            }], where: { ...global.enums.where }
        })).map(d => {
            let _d = d.toJSON()
            return { id: _d.id, name: _d.name }
        })

        return users
    }

    /// 执行脚本
    /// transition: 流转
    /// fields：字段输入
    static async script_execute(transition, fields) {
        if (transition.script_type !== global.enums.wk.script_type.none.name) {
            let script = global.enums.wk.script_type[transition.script_type]
            if (script) {
                await script.execute(fields)
            } 
        }
    }

    /// 工单面板
    /// ticket_stay(待处理的工单数) + time_month_commit(本月提交工单数) + ticket_month_finished(本月已完成工单数) + ticket_staff_active(员工活跃度) + ticket_category_distribute(工单分类分布)
    static async ticket_panel() {
        // 获取该月起始时间
        let month_start = moment().startOf('month')
        // 获取该月提交的工单
        let tickets = (await Ticket_Request.findAll({
            include: [{
                association: Ticket_Request.hasOne(WK_Process, {foreignKey: 'id', sourceKey: 'process_id', constraints: false}),
                required: true,
                attributes: ['name'],
                where: { ...global.enums.where }
            },], where: { ...global.enums.where, created_at: {[Op.gte]: month_start} }
        })).map(d => {
            let _d = d.toJSON()
            _d.process_name = _d.WK_Process.name
            return _d
        })
        let ticket_stay_count = tickets.filter(t => !t.is_finished).length
        let ticket_month_commit = tickets.length
        let ticket_month_finished = tickets.filter(t => t.is_finished).length
        let ticket_staff_active = Array.from(new Set(tickets.map(t => t.creator))).length
        let ticket_category_distribute = {}
        tickets.forEach(t => {
            if (ticket_category_distribute[t.process_name]) {
                ticket_category_distribute[t.process_name] = ticket_category_distribute[t.process_name] + 1
            } else {
                ticket_category_distribute[t.process_name] = 1
            }
        })
        return { ticket_stay_count, ticket_month_commit, ticket_month_finished, ticket_staff_active, ticket_category_distribute }
    }
}

export default TicketDao
