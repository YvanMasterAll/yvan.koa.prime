
// 枚举常量

const enums = {
    state: {            // 数据状态
        on: 'on',
        off: 'off',
        delete: 'delete'
    },
    _state: ['on', 'off', 'delete'],
    scope: {            // 权限范围
        all: 'all',     // 全部
        diy: 'diy',     // 自定义
        same: 'same'    // 本级
    },
    where: {
        state: 'on'
    },
    permissions: [
        { id: 1, name: '超级管理员', alias: 'ADMIN', pid: 0 },
        { id: 2, name: '用户管理', alias: 'USER_ALL', pid: 0 },
        { id: 3, name: '用户查询', alias: 'USER_SELECT', pid: 2 },
        { id: 4, name: '用户创建', alias: 'USER_CREATE', pid: 2 },
        { id: 5, name: '用户编辑', alias: 'USER_EDIT', pid: 2 },
        { id: 6, name: '用户删除', alias: 'USER_DELETE', pid: 2 },
        { id: 7, name: '角色管理', alias: 'ROLES_ALL', pid: 0 },
        { id: 8, name: '角色查询', alias: 'ROLES_SELECT', pid: 7 },
        { id: 10, name: '角色创建', alias: 'ROLES_CREATE', pid: 7 },
        { id: 11, name: '角色编辑', alias: 'ROLES_EDIT', pid: 7 },
        { id: 12, name: '角色删除', alias: 'ROLES_DELETE', pid: 7 },
        { id: 13, name: '权限管理', alias: 'PERMISSION_ALL', pid: 0 },
        { id: 14, name: '权限查询', alias: 'PERMISSION_SELECT', pid: 13 },
        { id: 15, name: '权限创建', alias: 'PERMISSION_CREATE', pid: 13 },
        { id: 16, name: '权限编辑', alias: 'PERMISSION_EDIT', pid: 13 },
        { id: 17, name: '权限删除', alias: 'PERMISSION_DELETE', pid: 13 },
        { id: 18, name: '缓存管理', alias: 'REDIS_ALL', pid: 0 },
        { id: 20, name: '缓存查询', alias: 'REDIS_SELECT', pid: 18 },
        { id: 22, name: '缓存删除', alias: 'REDIS_DELETE', pid: 18 },
        { id: 23, name: '图床管理', alias: 'PICTURE_ALL', pid: 0 },
        { id: 24, name: '查询图片', alias: 'PICTURE_SELECT', pid: 23 },
        { id: 25, name: '上传图片', alias: 'PICTURE_UPLOAD', pid: 23 },
        { id: 26, name: '删除图片', alias: 'PICTURE_DELETE', pid: 23 },
        { id: 29, name: '菜单管理', alias: 'MENU_ALL', pid: 0 },
        { id: 30, name: '菜单查询', alias: 'MENU_SELECT', pid: 29 },
        { id: 31, name: '菜单创建', alias: 'MENU_CREATE', pid: 29 },
        { id: 32, name: '菜单编辑', alias: 'MENU_EDIT', pid: 29 },
        { id: 33, name: '菜单删除', alias: 'MENU_DELETE', pid: 29 },
        { id: 35, name: '定时任务管理', alias: 'JOB_ALL', pid: 0 },
        { id: 36, name: '任务查询', alias: 'JOB_SELECT', pid: 35 },
        { id: 37, name: '任务创建', alias: 'JOB_CREATE', pid: 35 },
        { id: 38, name: '任务编辑', alias: 'JOB_EDIT', pid: 35 },
        { id: 39, name: '任务删除', alias: 'JOB_DELETE', pid: 35 },
        { id: 40, name: '部门管理', alias: 'DEPT_ALL', pid: 0 },
        { id: 41, name: '部门查询', alias: 'DEPT_SELECT', pid: 40 },
        { id: 42, name: '部门创建', alias: 'DEPT_CREATE', pid: 40 },
        { id: 43, name: '部门编辑', alias: 'DEPT_EDIT', pid: 40 },
        { id: 44, name: '部门删除', alias: 'DEPT_DELETE', pid: 40 },
        { id: 45, name: '岗位管理', alias: 'USERJOB_ALL', pid: 0 },
        { id: 46, name: '岗位查询', alias: 'USERJOB_SELECT', pid: 45 },
        { id: 47, name: '岗位创建', alias: 'USERJOB_CREATE', pid: 45 },
        { id: 48, name: '岗位编辑', alias: 'USERJOB_EDIT', pid: 45 },
        { id: 49, name: '岗位删除', alias: 'USERJOB_DELETE', pid: 45 },
        { id: 50, name: '字典管理', alias: 'DICT_ALL', pid: 0 },
        { id: 51, name: '字典查询', alias: 'DICT_SELECT', pid: 50 },
        { id: 52, name: '字典创建', alias: 'DICT_CREATE', pid: 50 },
        { id: 53, name: '字典编辑', alias: 'DICT_EDIT', pid: 50 },
        { id: 54, name: '字典删除', alias: 'DICT_DELETE', pid: 50 },
        { id: 55, name: '文件管理', alias: 'LOCALSTORAGE_ALL', pid: 0 },
        { id: 56, name: '文件搜索', alias: 'LOCALSTORAGE_SELECT', pid: 55 },
        { id: 57, name: '文件上传', alias: 'LOCALSTORAGE_CREATE', pid: 55 },
        { id: 58, name: '文件编辑', alias: 'LOCALSTORAGE_EDIT', pid: 55 },
        { id: 59, name: '文件删除', alias: 'LOCALSTORAGE_DELETE', pid:  5}
    ]
}

export default enums