import { User } from '../../models'
import { TicketDao, WK_CommonDao, UserDao } from '../../dao'
import utils from '../../utils'
const Sequelize = require('sequelize')
var _ = require('lodash')

/// 添加工单
export const ticket_add = async (ctx, next) => {
    // 读取参数
    let process_id = ctx.request.query.process_id*1
    let transition_id = ctx.request.query.transition_id*1
    let suggestion = ctx.request.query.suggestion
    // 参数验证
    if (!process_id || !transition_id) { 
        throw new global.errs.ParamsIllegal()
    }
    // 权限判断，目前没有限制新建工单的权限
    // 获取流程信息
    let process = await WK_CommonDao.process_list(process_id)
    if (!process) { throw new global.errs.ParamsIllegal("工单流程不存在") }
    // 获取流程字段和该状态下可显示和操作的字段
    let wk_fields = process.WK_Fields 
    let start_state = process.WK_State
    let fields = start_state.fields
    let transitions = start_state.WK_Transitions
    let transition = transitions.filter(d => d.id === transition_id)[0]
    if (!transition) { throw new global.errs.ParamsIllegal("工单流转(Transition)不存在") }
    // 获取目标状态信息
    let target_state = await WK_CommonDao.state(transition.target_state)
    // 验证工单字段输入的合法性，获取有效输入，是一个json数据
    let _fields = utils.validate_wk_fields(ctx, wk_fields, fields)
    // 执行脚本
    await TicketDao.script_execute(transition, _fields)
    // 新建工单
    await TicketDao.ticket_add(_fields, start_state, target_state, process_id, transition_id, ctx.state._user.id, suggestion)
    // TODO: 通知消息处理
    // TODO: 脚本执行逻辑

    ctx.resolve.success.bind(ctx)("成功创建工单")
}

/// 工单详情
export const ticket_info = async (ctx, next) => {
    let { id, isadmin, perms, roleids, dept_id } = ctx.state._user
    // 读取参数
    let ticket_id = ctx.request.query.ticket_id*1
    if (!ticket_id) { throw new global.errs.ParamsIllegal() }
    // 验证工单
    if (!(await TicketDao.ticket_exists(ticket_id))) {
        throw new global.errs.NotFound("该工单不存在")
    }
    // 获取工单信息
    let ticket_info = await TicketDao.ticket_info(ticket_id)
    if (!ticket_info) { throw new global.errs.ParamsIllegal("工单不存在") }
    // 验证用户权限
    if (!TicketDao.validate_ticketinfo(id, ticket_info, isadmin, perms, roleids, dept_id)) {
        throw new global.errs.ParamsIllegal("没有查看该工单的权限")
    }
    // 字段数据处理
    let wk_fields = await WK_CommonDao.fields({process_id: ticket_info.process_id})
    utils.split_wk_fields(wk_fields, ticket_info.json_data)
    ticket_info.WK_Fields = wk_fields
    // 创建者信息
    let user = (await User.findOne({
        where: { id: ticket_info.creator,  ...global.enums.where }, raw: true
    }))
    if (user) { ticket_info.creator_name = user.name }

    ctx.resolve.json.bind(ctx)(ticket_info)
}

/// 工单流转(Transition)
export const ticket_transition_add = async (ctx, next) => {
    let { id, dept_id, perms, roleids, isadmin } = ctx.state._user
    // 读取参数
    let ticket_id = ctx.request.query.ticket_id*1
    let process_id = ctx.request.query.process_id*1
    let transition_id = ctx.request.query.transition_id*1
    if (!ticket_id || !process_id || !transition_id) { throw new global.errs.ParamsIllegal() }
    // 获取工单
    let ticket = await TicketDao.ticket_state({id: ticket_id, process_id})
    if (!ticket) { throw new global.errs.ParamsIllegal() }
    // 判断工单是否已完成，已完成的工单不能再编辑
    if (ticket.is_finished) { throw new global.errs.ParamsIllegal("无法处理已完成的工单") }
    // 当前状态
    let current_state = ticket.WK_State
    let state_id = current_state.id
    // 验证用户
    if (!TicketDao.validate_transition(ticket, id, dept_id, perms, roleids, isadmin)) {
        throw new global.errs.ParamsIllegal("没有操作该工单的权限")
    }
    // 获取流转
    let transitions = await WK_CommonDao.transitions({source_state: state_id})
    let transition = transitions.filter(t => t.id === transition_id)[0]
    if (!transition) { throw new global.errs.ParamsIllegal("工单流转(Transition)不存在") }
    // 获取字段
    let wk_fields = await WK_CommonDao.fields({process_id})
    let fields = current_state.fields
    // 获取目标状态
    let target_state = await WK_CommonDao.state(transition.target_state)
    // 验证工单字段输入的合法性，获取有效输入，是一个json数据
    let _fields = utils.validate_wk_fields(ctx, wk_fields, fields)
    // 执行脚本
    await TicketDao.script_execute(transition, _fields)
    // 添加流转
    await TicketDao.transition_add(ticket, _fields, current_state, target_state, transition, ctx.state._user.id, ctx.request.query.suggestion)

    ctx.resolve.success.bind(ctx)("工单处理结果：" + transition.name + '成功')
}

/// 工单活动(Activity)
export const ticket_activity_list = async (ctx, next) => {
    let { id, dept_id, perms, isadmin, roleids } = ctx.state._user
    // 读取参数
    let ticket_id = ctx.request.query.ticket_id*1
    if (!ticket_id) { throw new global.errs.ParamsIllegal() }
    // 获取工单
    let ticket = await TicketDao.ticket({id: ticket_id})
    if (!ticket) { throw new global.errs.ParamsIllegal() }
    // 验证用户权限
    if (!TicketDao.validate_ticketinfo(id, ticket, isadmin, perms, roleids, dept_id)) {
        throw new global.errs.ParamsIllegal("没有查看工单活动的权限")
    }
    // 开始查询
    let { results, count } = await TicketDao.activity_list({ticket_id}, ctx)

    ctx.resolve.json.bind(ctx)(results, '操作成功', count)
}

/// 我发布的工单
export const ticket_commit_list = async (ctx, next) => {
    let { id } = ctx.state._user
    // 创建查询条件
    let where = await TicketDao.where_ticket(ctx)
    where.creator = id
    // 开始查询
    let { results, count } = await TicketDao.ticket_list(where, ctx)

    ctx.resolve.json.bind(ctx)(results, '操作成功', count)
}

/// 我待办的工单
export const ticket_hold_list = async (ctx, next) => {
    let { id } = ctx.state._user
    // 创建查询条件
    let where = await TicketDao.where_ticket(ctx)
    where.creator = id
    where.is_finished = false
    // 开始查询
    let { results, count } = await TicketDao.ticket_list(where, ctx)

    ctx.resolve.json.bind(ctx)(results, '操作成功', count)
}

/// 待处理的工单
export const ticket_stay_list = async (ctx, next) => {
    let { id, perms, dept_id, roleids, isadmin } = ctx.state._user
    // 验证用户权限
    if (!UserDao.isTicketExecutor(perms, isadmin)) { throw new global.errs.ParamsIllegal("没有权限查看相关内容") }
    // 创建查询条件
    let where = await TicketDao.where_ticket(ctx)
    // 开始查询
    let { results, count } = await TicketDao.ticket_stay_list(where, id, dept_id, roleids, ctx)

    ctx.resolve.json.bind(ctx)(results, '操作成功', count)
}

/// 我处理的工单
export const ticket_handle_list = async (ctx, next) => {
    let { id, perms, dept_id, roleids, isadmin } = ctx.state._user
    // 验证用户权限
    if (!UserDao.isTicketExecutor(perms, isadmin)) { throw new global.errs.ParamsIllegal("没有权限查看相关内容") }
    // 创建查询条件
    let where = await TicketDao.where_ticket(ctx)
    where.executors = {[Sequelize.Op.contains]: [id] }
    // 开始查询
    let { results, count } = await TicketDao.ticket_list(where, ctx)

    ctx.resolve.json.bind(ctx)(results, '操作成功', count)
}

/// 所有工单列表
export const ticket_list = async (ctx, next) => {
    // let { id, perms, dept_id, roleids } = ctx.state._user
    // 验证用户权限，因为交给中间件处理了，所以这里不需要再验证
    // if (!UserDao.isTicketManager(perms)) { throw new global.errs.ParamsIllegal("没有权限查看相关内容") }
    // 创建查询条件
    let where = await TicketDao.where_ticket(ctx)
    // 开始查询
    let { results, count } = await TicketDao.ticket_list(where, ctx)

    ctx.resolve.json.bind(ctx)(results, '操作成功', count)
}

/// 获取工单执行人
export const ticket_executors = async (ctx, next) => {
    let executors = await TicketDao.ticket_executors()

    ctx.resolve.json.bind(ctx)(executors)
}

/// 上传文件
export const ticket_upload = async (ctx, next) => {
    let upload = ctx.req.file
    if (!upload) { throw new global.errs.UploadFailed() } 
    let path = upload.path.replace('assets/', '')
    
    ctx.resolve.json.bind(ctx)(path.toUrl(), "上传文件成功")
}

/// 工单面板
/// ticket_stay(待处理的工单数) + time_month_commit(本月提交工单数) + ticket_month_finished(本月已完成工单数) + ticket_staff_active(员工活跃度) + ticket_category_distribute(工单分类分布)
export const ticket_panel = async (ctx, next) => {
    let { perms, isadmin } = ctx.state._user
    // 验证用户权限
    if (!UserDao.isTicketExecutor(perms, isadmin)) { throw new global.errs.ParamsIllegal("没有权限查看相关内容") }
    let result = await TicketDao.ticket_panel()
    
    ctx.resolve.json.bind(ctx)(result)
}