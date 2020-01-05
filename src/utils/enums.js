import utils from './index'
const Sequelize = require('sequelize')

// 枚举常量

const enums = {
    // 数据状态
    state: {         
        on: 'on',
        off: 'off',
        del: 'del'
    },
    _state: ['on', 'off', 'del'],
    // 权限范围
    scope: {            
        all: 'all',     // 全部
        diy: 'diy',     // 自定义
        same: 'same'    // 本级
    },
    // 悲观条件，只包含状态正常的数据
    where: {            
        state: 'on'
    },
    // 乐观条件，只要不是被删除的数据都包含在内
    _where: {           
        state: {
            [Sequelize.Op.notIn]: ['del']
        }
    },
    // 文件上传异常的关键字眼
    koaMulterErrs: [
        'LIMIT_PART_COUNT',
        'LIMIT_FILE_SIZE',
        'LIMIT_FILE_COUNT',
        'LIMIT_FIELD_KEY',
        'LIMIT_FIELD_VALUE',
        'LIMIT_FIELD_COUNT',
        'LIMIT_UNEXPECTED_FILE',
    ],
    // 资源权限
    permissions: [
        { id: 1, name: '超级管理员', alias: 'admin', pid: 0 },
        { id: 2, name: '用户管理', alias: 'user', pid: 0 },
        { id: 21, name: '用户查询', alias: 'list', pid: 2 },
        { id: 22, name: '用户创建', alias: 'add', pid: 2 },
        { id: 23, name: '用户编辑', alias: 'edit', pid: 2 },
        { id: 24, name: '用户删除', alias: 'del', pid: 2 },
        { id: 3, name: '角色管理', alias: 'role', pid: 0 },
        { id: 31, name: '角色查询', alias: 'list', pid: 3 },
        { id: 32, name: '角色创建', alias: 'add', pid: 3 },
        { id: 33, name: '角色编辑', alias: 'edit', pid: 3 },
        { id: 34, name: '角色删除', alias: 'del', pid: 3 },
        { id: 35, name: '菜单编辑', alias: 'menu_edit', pid: 3 },
        { id: 36, name: '权限编辑', alias: 'permission_edit', pid: 3 },
        { id: 4, name: '部门管理', alias: 'dept', pid: 0 },
        { id: 41, name: '部门查询', alias: 'list', pid: 4 },
        { id: 42, name: '部门创建', alias: 'add', pid: 4 },
        { id: 43, name: '部门编辑', alias: 'edit', pid: 4 },
        { id: 44, name: '部门删除', alias: 'del', pid: 4 },
        { id: 5, name: '岗位管理', alias: 'job', pid: 0 },
        { id: 51, name: '岗位查询', alias: 'list', pid: 5 },
        { id: 52, name: '岗位创建', alias: 'add', pid: 5 },
        { id: 53, name: '岗位编辑', alias: 'edit', pid: 5 },
        { id: 54, name: '岗位删除', alias: 'del', pid: 5 },
        { id: 6, name: '工单管理', alias: 'ticket', pid: 0 },
        { id: 61, name: '工单处理', alias: 'execute', pid: 6 },
        { id: 62, name: '工单查询', alias: 'list', pid: 6 },
    ],
    // 菜单权限
    menus: [
        {id: 1, name: '系统管理', path: 'admin', pid: 0, sort: 1}, 
        {id: 21, name: '用户管理', path: 'admin/user', pid: 1, sort: 21}, 
        {id: 22, name: '角色管理', path: 'admin/role', pid: 1, sort: 22}, 
        {id: 23, name: '部门管理', path: 'admin/dept', pid: 1, sort: 23}, 
        {id: 24, name: '岗位管理', path: 'admin/job', pid: 1, sort: 24},  
        {id: 3, name: '工单管理', path: 'ticket', pid: 0, sort: 3}, 
        {id: 30, name: '工单面板', path: 'ticket/panel', pid: 3, sort: 30}, 
        {id: 31, name: '我发布的工单', path: 'ticket/commit', pid: 3, sort: 31}, 
        {id: 32, name: '我待办的工单', path: 'ticket/hold', pid: 3, sort: 32}, 
        {id: 33, name: '待处理的工单', path: 'ticket/stay', pid: 3, sort: 33}, 
        {id: 34, name: '我处理的工单', path: 'ticket/handle', pid: 3, sort: 34},  
        {id: 35, name: '所有工单列表', path: 'ticket/list', pid: 3, sort: 35},  
    ]
}

// 工作流模块
enums.wk = {
    // 工作流字段类型
    field_type: {
        int: 'int',
        string: 'string',
        float: 'float',
        bool: 'bool',
        date: 'date',
        radio: 'radio',         // 单选框
        checkbox: 'checkbox',   // 多选框
        select: 'select',       // 下拉列表
        text: 'text',           // 文本域
        richtext: 'richtext',   // 富文本
        user: 'user',           // 用户
        image: 'image',         // 图片
        attachment: 'attachment'// 附件
    },
    _field_type: ['int', 'string', 'float', 'bool', 'date', 'radio', 'checkbox', 'select', 'text', 'richtext', 'user', 'image', 'attachment'],
    // 工作流字段读写类型
    field_attribute_type: { 
        readOnly: 0,            // 只读
        required: 1,            // 必填
        optional: 2             // 可选
    },
    // 干预类型，暂时没用在项目
    intervene_type: {
        none: 'none',                   // 无干预
        deliver: 'deliver',             // 转交操作
        add_node: 'add_node',           // 加签操作
        add_node_end: 'add_node_end',   // 加签处理完毕
        accept: 'accept',               // 接单操作
        comment: 'commont'              // 评论操作
    },
    _intervene_type: ['normal', 'deliver', 'add_node', 'add_node_end', 'accept', 'comment'],
    // 流转类型
    transition_type: { 
        normal: 'normal',       // 常规流转
    },
    _transition_type: ['normal'],
    // 流转类型
    action_type: {
        accept: 'accept',       // 同意
        deny: 'deny'            // 拒绝
    },
    _action_type: ['accept', 'deny'],
    // 执行人类型
    executor_type: {
        none: 'none',           // 无执行人
        personal: 'personal',   // 个人
        dept: 'dept',           // 部门
        role: 'role',           // 角色
        script: 'script'        // 脚本
    },
    _executor_type: ['personal', 'dept', 'script', 'role', 'none'],
    // 状态类型
    state_type: {
        normal: 'normal',       // 常规状态
        start: 'start',         // 开始状态
        end: 'end'              // 结束状态
    },
    _state_type: ['normal', 'start', 'end'],
    // 脚本类型
    script_type: {
        'none': { name: 'none', script: null },
        'caculate_leave_days': { name: 'caculate_leave_days', execute: utils.wk_script.caculate_leave_days}
    }
}

export default enums