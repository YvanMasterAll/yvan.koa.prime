import Ticket_Activity from '../workflow/ticket_activity'
import Ticket_Field from '../workflow/ticket_field'
import Ticket_Request from '../workflow/ticket_request'
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
        [1, '请假申请', '请假申请', 1, null]
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
        [1, '标题', 'title', '请假标题', 1, 1, 0, 'string', null],
        [2, '开始时间', 'leave_start', '请假开始时间', 1, 1, 5, 'date', null],
        [3, '结束时间', 'leave_end', '请假结束时间', 1, 1, 10, 'date', null],
        [4, '请假天数(0.5的倍数)', 'leave_days', '根据起止时间自动计算', 1, 1, 15, 'float', null],
        [5, '请假类型', 'leave_type', '请假类型', 1, 1, 20, 'select', {"1": "年假", "2": "调休", "3": "病假", "4": "婚假"}],
        [6, '提交附件', 'leave_prove', '病假请提供证明拍照附件， 婚假请提供结婚证拍照附件', 1, 1, 25, 'attachment', null],
        [7, '请假原因', 'leave_reason', '病假请提供证明拍照附件， 婚假请提供结婚证拍照附件', 1, 1, 30, 'text', null]
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
        [1, '新建请假工单', 1, 1, false, 5, 'start', null, 'none', {title: {attribute: 1, show: false}, leave_start: {attribute: 1, show: false}, leave_end: {attribute: 1, show: false}, leave_type: {attribute: 1, show: false}, leave_prove: {attribute: 2, show: false}, leave_reason: {attribute: 1, show: false}}],
        [2, '发起人-编辑中', 1, 1, true, 10, 'normal', null, 'none', {title: {attribute: 1, show: false}, leave_start: {attribute: 1, show: false}, leave_end: {attribute: 1, show: false}, leave_type: {attribute: 1, show: false}, leave_prove: {attribute: 2, show: false}, leave_reason: {attribute: 1, show: false}}],
        [3, '人事部-审批中', 1, 1, false, 15, 'normal', 10, 'dept', {title: {attribute: 0, show: false}, leave_start: {attribute: 0, show: false}, leave_end: {attribute: 0, show: false}, leave_type: {attribute: 0, show: false}, leave_prove: {attribute: 0, show: false}, leave_reason: {attribute: 0, show: false}, leave_days: {attribute: 0, show: false}}],
        [4, '管理员-审批中', 1, 1, false, 20, 'normal', 1, 'role', {title: {attribute: 0, show: false}, leave_start: {attribute: 0, show: false}, leave_end: {attribute: 0, show: false}, leave_type: {attribute: 0, show: false}, leave_prove: {attribute: 0, show: false}, leave_reason: {attribute: 0, show: false}, leave_days: {attribute: 0, show: false}}],
        [5, '请假工单结束', 1, 1, false, 25, 'end', null, 'none', {}],
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
        state.executor = d[7]
        state.executor_type = d[8]
        state.fields = d[9]
    
        await state.save()
    })
}

function mock_WK_Transition() {
    let data = [
        [1, '提交', 1, 1, 1, 3, 'normal', 'accept', 'caculate_leave_days'],
        [2, '保存', 1, 1, 1, 2, 'normal', 'accept', 'caculate_leave_days'],
        [3, '提交', 1, 1, 2, 3, 'normal', 'accept', 'caculate_leave_days'],
        [4, '保存', 1, 1, 2, 2, 'normal', 'accept', 'caculate_leave_days'],
        [5, '同意', 1, 1, 3, 4, 'normal', 'accept', 'none'],
        [6, '退回', 1, 1, 3, 2, 'normal', 'accept', 'none'],
        [7, '拒绝', 1, 1, 3, 4, 'normal', 'deny', 'none'],
        [8, '同意', 1, 1, 4, 5, 'normal', 'accept', 'none'],
        [9, '退回', 1, 1, 4, 2, 'normal', 'accept', 'none'],
        [10, '拒绝', 1, 1, 4, 5, 'normal', 'deny', 'none']
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