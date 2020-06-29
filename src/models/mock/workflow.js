import WK_Ticket_Activity from '../workflow/wk_ticket_activity'
import WK_Ticket_Request from '../workflow/wk_ticket_request'
import WK_Field from '../workflow/wk_field'
import WK_Notice from '../workflow/wk_notice'
import WK_Process from '../workflow/wk_process'
import WK_State from '../workflow/wk_state'
import WK_Transition from '../workflow/wk_transition'

// 初始化数据
function initData() {
    // mockLeaveTicket()
}

// 模拟请假工单
function mockLeaveTicket() {
    // 创建工作流程
    mock_Process()
    // 创建字段
    mock_WK_Field()
    // 创建状态
    mock_WK_State()
    // 创建流转
    mock_WK_Transition()
}

function mock_Process() {
    let data = [
        [1, '请假申请', '请假申请', 1, null],
        [2, '售后申请', '售后申请', 1, null],
        [3, '问题反馈', '问题反馈', 1, null],
        [4, '工作安排', '工作安排', 1, null]
    ]

    data.forEach(async d => {
        let process = new WK_Process()
        process.id = d[0]
        process.name = d[1]
        process.description = d[2]
        process.creator = d[3]
        process.notices = d[4]
    
        await process.save()
    })
}

function mock_WK_Field() {
    let data = [
        // 请假申请
        [1, '标题', 'title', '请假标题', 1, 1, 0, 'string', null],
        [2, '开始时间', 'leave_start', '请假开始时间', 1, 1, 5, 'date', null],
        [3, '结束时间', 'leave_end', '请假结束时间', 1, 1, 10, 'date', null],
        [4, '请假天数(0.5的倍数)', 'leave_days', '根据起止时间自动计算', 1, 1, 15, 'float', null],
        [5, '请假类型', 'leave_type', '请假类型', 1, 1, 20, 'select', {"1": "年假", "2": "调休", "3": "病假", "4": "婚假"}],
        [6, '申请材料', 'leave_prove', '病假请提供治疗凭证的拍照附件，婚假请提供结婚证的拍照附件', 1, 1, 25, 'attachment', null],
        [7, '请假原因', 'leave_reason', '请详细说明请假的原因', 1, 1, 30, 'text', null],
        // 售后申请
        [8, '标题', 'title', '售后标题', 2, 1, 0, 'string', null],
        [9, '客户名称', 'aftersales_customer', '客户名称', 2, 1, 5, 'string', null],
        [10, '设备名称', 'aftersales_device', '设备名称', 2, 1, 10, 'string', null],
        [11, '设备数量', 'aftersales_number', '设备数量', 2, 1, 15, 'int', null],
        [12, '服务类型', 'aftersales_category', '服务类型', 2, 1, 20, 'select', {1: '维修', 2: '退换', 3: '退回'}],
        [13, '申请材料', 'aftersales_prove', '提供售后过程中产生的照片和文件资料，如没有请忽略', 2, 1, 25, 'attachment', null],
        [14, '问题描述', 'aftersales_reason', '请描述问题的详细内容', 2, 1, 30, 'text', null],
        [15, '处理结果', 'aftersales_result', '请详细描述处理的方法，过程和结果', 2, 1, 35, 'text', null],
        // 问题反馈
        [16, '标题', 'title', '反馈标题', 3, 1, 0, 'string', null],
        [17, '问题类型', 'feedback_category', '问题类型', 3, 1, 5, 'select', {1: '研发', 2: '测试', 3: '管理'}],
        [18, '问题描述', 'feedback_reason', '请描述问题的详细内容', 3, 1, 10, 'text', null],
        [19, '处理建议', 'feedback_advice', '请详细描述解决问题的方法和建议', 3, 1, 15, 'text', null],
        [20, '奖励金额', 'feedback_reward', '为问题反馈的员工提供的奖励金额', 3, 1, 20, 'int', null],
        // 工作安排
        [21, '标题', 'title', '反馈标题', 4, 1, 0, 'string', null],
        [22, '工作类型', 'arrange_category', '工作类型', 4, 1, 5, 'select', {1: '研发', 2: '测试', 3: '管理'}],
        [23, '工作描述', 'arrange_reason', '请描述工作的详细内容', 4, 1, 10, 'text', null],
        [24, '工作安排', 'arrange_advice', '请详细描述工作的具体安排', 4, 1, 15, 'text', null],
        [25, '工作附件', 'arrange_files', '提供完成工作需要的资料', 4, 1, 20, 'attachment', null],
    ]

    data.forEach(async d => {
        let field = new WK_Field()
        field.id = d[0]
        field.name = d[1]
        field.key = d[2]
        field.description = d[3]
        field.process_id = d[4]
        field.creator = d[5]
        field.sort = d[6]
        field.type = d[7]
        field.choice = d[8]
    
        await field.save()
    })
}

function mock_WK_State() {
    // 首先判断个人有没有工单处理的能力，然后再判断工单指向的执行部门是否是自己所在部门，如果条件符合就可以处理工单
    let data = [
        // 请假申请
        [1, '新建请假工单', 1, 1, false, 5, 'start', null, 'none', 'direct', {title: {attribute: 1, show: false}, leave_start: {attribute: 1, show: false}, leave_end: {attribute: 1, show: false}, leave_type: {attribute: 1, show: false}, leave_prove: {attribute: 2, show: false}, leave_reason: {attribute: 1, show: false}}],
        [2, '发起人-编辑中', 1, 1, true, 10, 'normal', null, 'none', 'direct', {title: {attribute: 1, show: false}, leave_start: {attribute: 1, show: false}, leave_end: {attribute: 1, show: false}, leave_type: {attribute: 1, show: false}, leave_prove: {attribute: 2, show: false}, leave_reason: {attribute: 1, show: false}}],
        [3, '人事部-审批中', 1, 1, false, 15, 'normal', [10], 'dept', 'direct', {title: {attribute: 0, show: false}, leave_start: {attribute: 0, show: false}, leave_end: {attribute: 0, show: false}, leave_type: {attribute: 0, show: false}, leave_prove: {attribute: 0, show: false}, leave_reason: {attribute: 0, show: false}, leave_days: {attribute: 0, show: false}}],
        [4, '管理员-审批中', 1, 1, false, 20, 'normal', [1], 'role', 'direct', {title: {attribute: 0, show: false}, leave_start: {attribute: 0, show: false}, leave_end: {attribute: 0, show: false}, leave_type: {attribute: 0, show: false}, leave_prove: {attribute: 0, show: false}, leave_reason: {attribute: 0, show: false}, leave_days: {attribute: 0, show: false}}],
        [5, '请假工单结束', 1, 1, false, 25, 'end', null, 'none', 'direct', {}],
        // 售后申请
        [6, '新建售后申请', 2, 1, false, 5, 'start', null, 'none', 'direct', {title: {attribute: 1, show: false}, aftersales_customer: {attribute: 1, show: false}, aftersales_device: {attribute: 1, show: false}, aftersales_number: {attribute: 1, show: false}, aftersales_category: {attribute: 1, show: false}, aftersales_prove: {attribute: 2, show: false}, aftersales_reason: {attribute: 1, show: false}, aftersales_result: {attribute: 1, show: false}}],
        [7, '发起人-编辑中', 2, 1, true, 10, 'normal', null, 'none', 'direct', {title: {attribute: 1, show: false}, aftersales_customer: {attribute: 1, show: false}, aftersales_device: {attribute: 1, show: false}, aftersales_number: {attribute: 1, show: false}, aftersales_category: {attribute: 1, show: false}, aftersales_prove: {attribute: 2, show: false}, aftersales_reason: {attribute: 1, show: false}, aftersales_result: {attribute: 1, show: false}}],
        [8, '管理员-审批中', 2, 1, false, 15, 'normal', [1], 'role', 'direct', {title: {attribute: 0, show: false}, aftersales_customer: {attribute: 0, show: false}, aftersales_device: {attribute: 0, show: false}, aftersales_number: {attribute: 0, show: false}, aftersales_category: {attribute: 0, show: false}, aftersales_prove: {attribute: 0, show: false}, aftersales_reason: {attribute: 0, show: false}, aftersales_result: {attribute: 0, show: false}}],
        [9, '售后申请结束', 2, 1, false, 20, 'end', null, 'none', 'direct', {}],
        // 问题反馈
        [10, '新建问题反馈', 3, 1, false, 5, 'start', null, 'none', 'direct', {title: {attribute: 1, show: false}, feedback_category: {attribute: 1, show: false}, feedback_reason: {attribute: 1, show: false}, feedback_advice: {attribute: 1, show: false}}],
        [11, '发起人-编辑中', 3, 1, true, 10, 'normal', null, 'none', 'direct', {title: {attribute: 1, show: false}, feedback_category: {attribute: 1, show: false}, feedback_reason: {attribute: 1, show: false}, feedback_advice: {attribute: 1, show: false}}],
        [12, '管理员-审批中', 3, 1, false, 15, 'normal', [1], 'role', 'direct', {title: {attribute: 0, show: false}, feedback_category: {attribute: 0, show: false}, feedback_reason: {attribute: 0, show: false}, feedback_advice: {attribute: 0, show: false}, feedback_reward: {attribute: 2, show: false}}],
        [13, '问题反馈结束', 3, 1, false, 20, 'end', null, 'none', 'direct', {}],
        // 工作安排
        [14, '新建工作安排', 4, 1, false, 5, 'start', null, 'none', 'direct', {title: {attribute: 1, show: false}, arrange_category: {attribute: 1, show: false}, arrange_reason: {attribute: 1, show: false}, arrange_advice: {attribute: 1, show: false}, arrange_files: {attribute: 1, show: false}}],
        [15, '发起人-编辑中', 4, 1, true, 10, 'normal', null, 'none', 'direct', {title: {attribute: 1, show: false}, arrange_category: {attribute: 1, show: false}, arrange_reason: {attribute: 1, show: false}, arrange_advice: {attribute: 1, show: false}, arrange_files: {attribute: 1, show: false}}],
        [16, '负责人-执行中', 4, 1, false, 15, 'normal', [3, 4], 'multi', 'all', {title: {attribute: 0, show: false}, arrange_category: {attribute: 0, show: false}, arrange_reason: {attribute: 0, show: false}, arrange_advice: {attribute: 0, show: false}, arrange_files: {attribute: 0, show: false}}],
        [17, '管理员-审批中', 4, 1, false, 20, 'normal', [1], 'role', 'direct', {title: {attribute: 0, show: false}, arrange_category: {attribute: 0, show: false}, arrange_reason: {attribute: 0, show: false}, arrange_advice: {attribute: 0, show: false}, arrange_files: {attribute: 0, show: false}}],
        [18, '工作安排结束', 4, 1, false, 25, 'end', null, 'none', 'direct', {}],
    ]

    data.forEach(async d => {
        let state = new WK_State()
        state.id = d[0]
        state.name = d[1]
        state.process_id = d[2]
        state.creator = d[3]
        state.is_hidden = d[4]
        state.sort = d[5]
        state.type = d[6]
        state.executors = d[7]
        state.executor_type = d[8]
        state.distribute_type = d[9]
        state.fields = d[10]
    
        await state.save()
    })
}

function mock_WK_Transition() {
    let data = [
        // 请假申请
        [1, '提交', 1, 1, 1, 3, 'normal', 'accept', 'caculate_leave_days'],
        [2, '保存', 1, 1, 1, 2, 'normal', 'accept', 'caculate_leave_days'],
        [3, '提交', 1, 1, 2, 3, 'normal', 'accept', 'caculate_leave_days'],
        [4, '保存', 1, 1, 2, 2, 'normal', 'accept', 'caculate_leave_days'],
        [5, '同意', 1, 1, 3, 4, 'normal', 'accept', 'none'],
        [6, '退回', 1, 1, 3, 2, 'normal', 'accept', 'none'],
        [7, '拒绝', 1, 1, 3, 4, 'normal', 'deny', 'none'],
        [8, '同意', 1, 1, 4, 5, 'normal', 'accept', 'none'],
        [9, '退回', 1, 1, 4, 2, 'normal', 'accept', 'none'],
        [10, '拒绝', 1, 1, 4, 5, 'normal', 'deny', 'none'],
        // 售后申请
        [11, '提交', 2, 1, 6, 8, 'normal', 'accept', 'none'],
        [12, '保存', 2, 1, 6, 7, 'normal', 'accept', 'none'],
        [13, '提交', 2, 1, 7, 8, 'normal', 'accept', 'none'],
        [14, '保存', 2, 1, 7, 7, 'normal', 'accept', 'none'],
        [15, '同意', 2, 1, 8, 9, 'normal', 'accept', 'none'],
        [16, '退回', 2, 1, 8, 7, 'normal', 'accept', 'none'],
        [17, '拒绝', 2, 1, 8, 9, 'normal', 'deny', 'none'],
        // 问题反馈
        [18, '提交', 3, 1, 10, 12, 'normal', 'accept', 'none'],
        [19, '保存', 3, 1, 10, 11, 'normal', 'accept', 'none'],
        [20, '提交', 3, 1, 11, 12, 'normal', 'accept', 'none'],
        [21, '保存', 3, 1, 11, 11, 'normal', 'accept', 'none'],
        [22, '同意', 3, 1, 12, 13, 'normal', 'accept', 'none'],
        [23, '退回', 3, 1, 12, 11, 'normal', 'accept', 'none'],
        [24, '拒绝', 3, 1, 12, 13, 'normal', 'deny', 'none'],
        // 工作安排
        [25, '提交', 4, 1, 14, 16, 'normal', 'accept', 'none'],
        [26, '保存', 4, 1, 14, 15, 'normal', 'accept', 'none'],
        [27, '提交', 4, 1, 15, 16, 'normal', 'accept', 'none'],
        [28, '保存', 4, 1, 15, 15, 'normal', 'accept', 'none'],
        [29, '完成', 4, 1, 16, 17, 'normal', 'accept', 'none'],
        [30, '中断', 4, 1, 16, 18, 'normal', 'deny', 'none'],
        [31, '验收', 4, 1, 17, 18, 'normal', 'accept', 'none'],
        [32, '复检', 4, 1, 17, 16, 'normal', 'accept', 'none']
    ]

    data.forEach(async d => {
        let transition = new WK_Transition()
        transition.id = d[0]
        transition.name = d[1]
        transition.process_id = d[2]
        transition.creator = d[3]
        transition.source_state = d[4]
        transition.target_state = d[5]
        transition.type = d[6]
        transition.action_type = d[7]
        transition.script_type = d[8]
    
        await transition.save()
    })
}

initData()