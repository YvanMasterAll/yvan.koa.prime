const Sequelize = require('sequelize')

// 枚举常量

const enums = {
    state: {            // 数据状态
        on: 'on',
        off: 'off',
        del: 'del'
    },
    _state: ['on', 'off', 'del'],
    scope: {            // 权限范围
        all: 'all',     // 全部
        diy: 'diy',     // 自定义
        same: 'same'    // 本级
    },
    where: {            // 悲观条件
        state: 'on'
    },
    _where: {           // 乐观条件
        state: {
            [Sequelize.Op.notIn]: ['del']
        }
    },
    koaMulterErrs: [
        'LIMIT_PART_COUNT',
        'LIMIT_FILE_SIZE',
        'LIMIT_FILE_COUNT',
        'LIMIT_FIELD_KEY',
        'LIMIT_FIELD_VALUE',
        'LIMIT_FIELD_COUNT',
        'LIMIT_UNEXPECTED_FILE',
    ],
    permissions: [
        { id: 1, name: '超级管理员', alias: 'admin', pid: 0 },
        { id: 2, name: '用户管理', alias: 'user', pid: 0 },
        { id: 3, name: '用户查询', alias: 'list', pid: 2 },
        { id: 4, name: '用户创建', alias: 'add', pid: 2 },
        { id: 5, name: '用户编辑', alias: 'edit', pid: 2 },
        { id: 6, name: '用户删除', alias: 'del', pid: 2 },
        { id: 7, name: '角色管理', alias: 'role', pid: 0 },
        { id: 8, name: '角色查询', alias: 'list', pid: 7 },
        { id: 10, name: '角色创建', alias: 'add', pid: 7 },
        { id: 11, name: '角色编辑', alias: 'edit', pid: 7 },
        { id: 12, name: '角色删除', alias: 'del', pid: 7 },
        { id: 13, name: '菜单编辑', alias: 'menu_edit', pid: 7 },
        { id: 14, name: '权限编辑', alias: 'permission_edit', pid: 7 },
        { id: 15, name: '部门管理', alias: 'dept', pid: 0 },
        { id: 16, name: '部门查询', alias: 'list', pid: 15 },
        { id: 17, name: '部门创建', alias: 'add', pid: 15 },
        { id: 18, name: '部门编辑', alias: 'edit', pid: 15 },
        { id: 19, name: '部门删除', alias: 'del', pid: 15 },
        { id: 20, name: '岗位管理', alias: 'job', pid: 0 },
        { id: 21, name: '岗位查询', alias: 'list', pid: 20 },
        { id: 22, name: '岗位创建', alias: 'add', pid: 20 },
        { id: 23, name: '岗位编辑', alias: 'edit', pid: 20 },
        { id: 24, name: '岗位删除', alias: 'del', pid: 20 },
        { id: 25, name: '权限管理', alias: 'PERMISSION_ALL', pid: 0 },
        { id: 26, name: '权限查询', alias: 'PERMISSION_SELECT', pid: 25 },
        { id: 27, name: '权限创建', alias: 'PERMISSION_CREATE', pid: 25 },
        { id: 28, name: '权限编辑', alias: 'PERMISSION_EDIT', pid: 25 },
        { id: 29, name: '权限删除', alias: 'PERMISSION_DELETE', pid: 25 },
        { id: 30, name: '缓存管理', alias: 'REDIS_ALL', pid: 0 },
        { id: 31, name: '缓存查询', alias: 'REDIS_SELECT', pid: 30 },
        { id: 32, name: '缓存删除', alias: 'REDIS_DELETE', pid: 30 },
        { id: 33, name: '图床管理', alias: 'PICTURE_ALL', pid: 0 },
        { id: 34, name: '查询图片', alias: 'PICTURE_SELECT', pid: 33 },
        { id: 35, name: '上传图片', alias: 'PICTURE_UPLOAD', pid: 33 },
        { id: 36, name: '删除图片', alias: 'PICTURE_DELETE', pid: 33 },
        { id: 37, name: '菜单管理', alias: 'MENU_ALL', pid: 0 },
        { id: 38, name: '菜单查询', alias: 'MENU_SELECT', pid: 37 },
        { id: 39, name: '菜单创建', alias: 'MENU_CREATE', pid: 37 },
        { id: 40, name: '菜单编辑', alias: 'MENU_EDIT', pid: 37 },
        { id: 41, name: '菜单删除', alias: 'MENU_DELETE', pid: 37 },
        { id: 42, name: '定时任务管理', alias: 'JOB_ALL', pid: 0 },
        { id: 43, name: '任务查询', alias: 'JOB_SELECT', pid: 42 },
        { id: 44, name: '任务创建', alias: 'JOB_CREATE', pid: 42 },
        { id: 45, name: '任务编辑', alias: 'JOB_EDIT', pid: 42 },
        { id: 46, name: '任务删除', alias: 'JOB_DELETE', pid: 42 },
        { id: 47, name: '字典管理', alias: 'DICT_ALL', pid: 0 },
        { id: 48, name: '字典查询', alias: 'DICT_SELECT', pid: 47 },
        { id: 49, name: '字典创建', alias: 'DICT_CREATE', pid: 47 },
        { id: 50, name: '字典编辑', alias: 'DICT_EDIT', pid: 47 },
        { id: 51, name: '字典删除', alias: 'DICT_DELETE', pid: 47 },
        { id: 52, name: '文件管理', alias: 'LOCALSTORAGE_ALL', pid: 0 },
        { id: 53, name: '文件搜索', alias: 'LOCALSTORAGE_SELECT', pid: 52 },
        { id: 54, name: '文件上传', alias: 'LOCALSTORAGE_CREATE', pid: 52 },
        { id: 55, name: '文件编辑', alias: 'LOCALSTORAGE_EDIT', pid: 52 },
        { id: 56, name: '文件删除', alias: 'LOCALSTORAGE_DELETE', pid:  52 }
    ],
    menus: [
        {id: 1, name: '系统管理', path: 'admin', pid: 0, sort: 1}, 
        {id: 2, name: '用户管理', path: 'admin/user', pid: 1, sort: 2}, 
        {id: 3, name: '角色管理', path: 'admin/role', pid: 1, sort: 3}, 
        {id: 35,name: '部门管理', path: 'admin/dept', pid: 1, sort: 6}, 
        {id: 37,name: '岗位管理', path: 'admin/job', pid: 1, sort: 7}, 
        {id: 28,name: '定时任务', path: 'admin/timing/index', pid: 36, sort: 21}, 
        {id: 39,name: '字典管理', path: 'admin/dict/index', pid: 1, sort: 8},
        {id: 4, name: '权限管理', path: 'admin/permission/index', pid: 1, sort: 4}, 
        {id: 5, name: '菜单管理', path: 'admin/menu/index', pid: 1, sort: 5}, 
        {id: 6, name: '系统监控', path: 'monitor', pid: 0, sort: 10}, 
        {id: 7, name: '操作日志', path: 'monitor/log/index', pid: 6, sort: 11}, 
        {id: 8, name: '系统缓存', path: 'monitor/redis/index', pid: 6, sort: 13}, 
        {id: 9, name: 'SQL监控', path: 'monitor/sql/index', pid: 6, sort: 14}, 
        {id: 10,name: '组件管理', path: 'components', pid: 0, sort: 50}, 
        {id: 11,name: '图标库', path: 'components/IconSelect', pid: 10, sort: 51}, 
        {id: 14,name: '邮件工具', path: 'tools/email/index', pid: 36, sort: 24}, 
        {id: 15,name: '富文本', path: 'components/Editor', pid: 10, sort: 52}, 
        {id: 16,name: '图床管理', path: 'tools/picture/index', pid: 36, sort: 25}, 
        {id: 18,name: '存储管理', path: 'tools/storage/index', pid: 36, sort: 23}, 
        {id: 19,name: '支付宝工具', path: 'tools/aliPay/index', pid: 36, sort: 27}, 
        {id: 21,name: '多级菜单', path: 'nested', pid: 0, sort: 900}, 
        {id: 22,name: '二级菜单1', path: 'nested/menu1/index', pid: 21, sort: 999}, 
        {id: 23,name: '二级菜单2', path: 'nested/menu2/index', pid: 21, sort: 999}, 
        {id: 24,name: '三级菜单1', path: 'nested/menu1/menu1-1', pid: 22, sort: 999}, 
        {id: 27,name: '三级菜单2', path: 'nested/menu1/menu1-2', pid: 22, sort: 999}, 
        {id: 30,name: '代码生成', path: 'generator/index', pid: 36, sort: 22}, 
        {id: 32,name: '异常日志', path: 'monitor/log/errorLog', pid: 6, sort: 12},
        {id: 33,name: 'Markdown', path: 'components/MarkDown', pid: 10, sort: 53}, 
        {id: 34,name: 'Yaml编辑器', path: 'components/YamlEdit', pid: 10, sort: 54}, 
        {id: 36,name: '系统工具', path: 'tools', pid: 0, sort: 20}, 
        {id: 38,name: '接口文档', path: 'tools/swagger/index', pid: 36, sort: 26}, 
    ]
}

export default enums