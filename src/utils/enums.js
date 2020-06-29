import utils from './index'
const Sequelize = require('sequelize')

// 枚举常量

const enums = {
    // 数据状态
    state: { on: 'on', off: 'off', del: 'del' },
    state_arr: ['on', 'off', 'del'],
    // 权限范围
    scope: {            
        all: 'all',     // 全部
        diy: 'diy',     // 自定义
        same: 'same'    // 本级
    },
    where: {            // 状态正常条件
        state: 'on'     
    },
    where_notdel: {     // 状态未删除条件
        state: {
            [Sequelize.Op.notIn]: ['del']
        }
    },
    // 文件上传异常的关键字眼，用于异常捕捉
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
        { id: 35, name: '菜单权限编辑', alias: 'menu_edit', pid: 3 },
        { id: 36, name: '资源权限编辑', alias: 'permission_edit', pid: 3 },
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
        { id: 7, name: '表格管理', alias: 'sheet', pid: 0 },
        { id: 71, name: '表格查询', alias: 'list', pid: 7 },
        { id: 72, name: '表格创建', alias: 'add', pid: 7 },
        { id: 73, name: '表格编辑', alias: 'edit', pid: 7 },
        { id: 74, name: '表格删除', alias: 'del', pid: 7 },
        { id: 75, name: '字段查询', alias: 'field_list', pid: 7 },
        { id: 76, name: '字段创建', alias: 'field_add', pid: 7 },
        { id: 77, name: '字段编辑', alias: 'field_edit', pid: 7 },
        { id: 78, name: '字段删除', alias: 'field_del', pid: 7 },
        { id: 79, name: '模板查询', alias: 'tmpl_list', pid: 7 },
        { id: 80, name: '模板创建', alias: 'tmpl_add', pid: 7 },
        { id: 81, name: '模板删除', alias: 'tmpl_del', pid: 7 },
    ],
    // 菜单权限
    menus: [
        {id: 1, name: '系统菜单', path: 'admin', pid: 0, type: 0, sort: 1}, 
        {id: 21, name: '用户管理', path: 'admin/user', pid: 1, type: 1, sort: 21}, 
        {id: 22, name: '角色管理', path: 'admin/role', pid: 1, type: 1, sort: 22}, 
        {id: 23, name: '部门管理', path: 'admin/dept', pid: 1, type: 1, sort: 23}, 
        {id: 24, name: '岗位管理', path: 'admin/job', pid: 1, type: 1, sort: 24},  
        {id: 3, name: '办公菜单', path: 'oa', pid: 0, type: 0, sort: 3}, 
        {id: 4, name: '工单管理', path: 'oa/ticket', pid: 3, type: 0, sort: 4}, 
        {id: 30, name: '工单面板', path: 'oa/ticket/panel', pid: 4, type: 1, sort: 30}, 
        {id: 31, name: '我发布的工单', path: 'oa/ticket/commit', pid: 4, type: 1, sort: 31}, 
        {id: 33, name: '待处理的工单', path: 'oa/ticket/todo', pid: 4, type: 1, sort: 33}, 
        {id: 34, name: '我处理的工单', path: 'oa/ticket/handle', pid: 4, type: 1, sort: 34},  
        {id: 35, name: '所有工单列表', path: 'oa/ticket/list', pid: 4, type: 1, sort: 35},  
        {id: 5, name: '表格管理', path: 'oa/sheet', pid: 3, type: 0, sort: 5}, 
        {id: 36, name: '表格列表', path: 'oa/sheet/list', pid: 5, type: 1, sort: 36}, 
        {id: 37, name: '模板管理', path: 'oa/sheet/tmpl', pid: 5, type: 1, sort: 37}, 
        {id: 38, name: '字段管理', path: 'oa/sheet/field', pid: 5, type: 1, sort: 38}, 
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
    field_types: ['int', 'string', 'float', 'bool', 'date', 'radio', 'checkbox', 'select', 'text', 'richtext', 'user', 'image', 'attachment'],
    // 工作流字段读写类型
    field_attribute_type: { 
        readOnly: 0,            // 只读
        required: 1,            // 必填
        optional: 2             // 可选
    },
    // 分发类型
    distribute_type: {
        direct: 'direct',       // 直接处理(在当前状态下，每个执行人都可以处理工单并进入下一个状态)
        all: 'all'              // 全部处理(只有当所有执行人都处理完工单才能进入下一个状态)
    },
    distribute_types: ['direct', 'all'],
    // 干预类型，暂时没用在项目
    intervene_type: {
        none: 'none',                   // 无干预
        deliver: 'deliver',             // 转交操作
        add_node: 'add_node',           // 加签操作
        add_node_end: 'add_node_end',   // 加签处理完毕
        accept: 'accept',               // 接单操作
        comment: 'commont'              // 评论操作
    },
    intervene_types: ['normal', 'deliver', 'add_node', 'add_node_end', 'accept', 'comment'],
    // 流转类型
    transition_type: { 
        normal: 'normal',       // 常规流转
    },
    transition_types: ['normal'],
    // 流转类型
    action_type: {
        accept: 'accept',       // 同意
        deny: 'deny'            // 拒绝
    },
    action_types: ['accept', 'deny'],
    // 执行人类型
    executor_type: {
        none: 'none',           // 无执行人
        personal: 'personal',   // 个人
        multi: 'multi',         // 多人
        dept: 'dept',           // 部门
        role: 'role',           // 角色
        script: 'script'        // 脚本
    },
    executor_types: ['personal', 'multi', 'dept', 'script', 'role', 'none'],
    // 状态类型
    state_type: {
        normal: 'normal',       // 常规状态
        start: 'start',         // 开始状态
        end: 'end'              // 结束状态
    },
    state_types: ['normal', 'start', 'end'],
    // 脚本类型
    script_type: {
        'none': { name: 'none', script: null },
        'caculate_leave_days': { name: 'caculate_leave_days', execute: utils.wk_script.caculate_leave_days}
    }
}

export default enums