import User from '../user'
import Role from '../role'
import Dept from '../dept'
import Job from '../job'
import Menu from '../menu'
import Permission from '../permission'
import Roles_Depts from '../roles_depts'
import Roles_Menus from '../roles_menus'
import Roles_Permissions from '../roles_permissions'
import Users_Roles from '../users_roles'

// 初始化数据
function initData() {
    // // DATA: 部门
    // initData_Dept()

    // // DATA: 岗位
    // initData_Job()

    // // DATA: 菜单
    // initData_Menu()

    // // DATA: 权限
    // initData_Perm()

    // // DATA: 角色
    // initData_Role()

    // // DATA: 角色的部门权限
    // initData_Roles_Depts()

    // // DATA: 角色的菜单权限
    // initData_Roles_Menus()

    // // DATA: 角色的资源权限
    // initData_Roles_Perms()

    // // DATA: 用户角色
    // initData_Users_Roles()

    // // DATA: 用户
    // initData_Users()

    // // 重置缓存
    // resetCache()
}

function initData_Dept() {
    let data = [
        // [1, '中正智控', 0], [2, '华南分部', 1], [3, '华北分部', 1], [4, '研发部', 2], [5, '运维部', 2], [6, '财务部', 2], [7, '市场部', 2], [8, '测试部', 3], [9, '行政部', 3], [10, '人事部', 3]
        [1, '中正智控', 0], [4, '研发部', 1], [6, '财务部', 1], [7, '市场部', 1], [10, '人事部', 1]
    ]
    
    data.forEach(async d => {
        let dept = new Dept()
        dept.id = d[0]
        dept.name = d[1]
        dept.pid = d[2]
    
        await dept.save()
    })
}

function initData_Job() {
    let data = [
        // [1, '董事长', 1, 1], [2, '董事长秘书', 2, 1], [3, '人事专员', 3, 10], [4, '产品经理', 4, 4], [5, '软件测试', 5, 4], [6, '全栈开发', 6, 4]
        [1, '总经理', 1, 1], [3, '人事专员', 3, 10], [4, '产品经理', 4, 4], [5, '测试人员', 5, 4], [6, '开发人员', 6, 4], [7, '财务专员', 7, 6], [8, '销售人员', 8, 7]
    ]
    
    data.forEach(async d => {
        let job = new Job()
        job.id = d[0]
        job.name = d[1]
        job.sort = d[2]
        job.dept_id = d[3]
    
        await job.save()
    })
}

function initData_Menu() {
    let data = global.enums.menus

    data.forEach(async d => {
        let menu = new Menu()
        menu.id = d.id
        menu.name = d.name
        menu.path = d.path
        menu.pid = d.pid
        menu.sort = d.sort
    
        await menu.save()
    })
}

function initData_Perm() {
    let data = global.enums.permissions

    data.forEach(async d => {
        let permission = new Permission()
        permission.id = d.id
        permission.name = d.name
        permission.alias = d.alias
        permission.pid = d.pid
    
        await permission.save()
    })
}

function initData_Role() {
    let data = [
        // [1, '超级管理员', '·', 'all', 1], [2, '普通管理员', '普通管理员级别为2，使用该角色新增用户时只能赋予比普通管理员级别低的角色', 'diy', 2], [3, '普通用户', '用于测试菜单与权限', 'diy', 3]
        [1, '超级管理员', '最高权限执行人', 'all', 1], [2, '人事管理', '人事部门管理角色，可以处理人事相关事务', 'all', 5], [3, '普通员工', '普通角色，适用于公司在职人员', 'same', 10]
    ]

    data.forEach(async d => {
        let role = new Role()
        role.id = d[0]
        role.name = d[1]
        role.remark = d[2]
        role.scope = d[3]
        role.level = d[4]
    
        await role.save()
    })
}

function initData_Roles_Depts() {
    // let data = [
    //     [1, 2, 5],
    //     [2, 3, 8],
    //     [3, 3, 2],
    //     [4, 2, 3],
    //     [5, 2, 6]
    // ]

    // data.forEach(async d => {
    //     let roles_depts = new Roles_Depts()
    //     roles_depts.id = d[0]
    //     roles_depts.role_id = d[1]
    //     roles_depts.dept_id = d[2]
    
    //     await roles_depts.save()
    // })
}

function initData_Roles_Menus() {
    let data = [ 
        // [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [8, 3], [9, 3], [10, 3], [11, 3], [14, 3], [15, 3], [16, 3], [17, 3], [18, 3], [19, 3], [21, 3], [22, 3], [23, 3], [24, 3], [27, 3], [28, 3], [30, 3], [33, 3], [34, 3], [35, 3], [36, 3], [37, 3], [38, 3], [39, 3], [1, 2], [2, 2],
        [2, 1], [2, 23], [2, 24], [2, 3], [2, 31], [2, 32], [2, 33], [2, 34], [3, 3], [3, 30], [3, 31], [3, 32]
    ]

    data.forEach(async d => {
        let roles_menus = new Roles_Menus()
        roles_menus.role_id = d[0]
        roles_menus.menu_id = d[1]
    
        await roles_menus.save()
    })
}

function initData_Roles_Perms() {
    let data = [ 
        // [1, 1], [2, 3], [2, 4], [2, 5], [3, 3], [3, 8], [3, 14], [3, 30], [3, 33], [3, 34], [3, 35], [3, 36], [3, 38], [3, 43], [3, 16], [3, 21], [3, 48],
        [1, 1], [2, 2], [2, 21], [2, 22], [2, 23], [2, 24], [2, 4], [2, 41], [2, 42], [2, 43], [2, 44], [2, 5], [2, 51], [2, 52], [2, 53], [2, 54], [2, 61]
    ]

    data.forEach(async d => {
        let roles_permissions = new Roles_Permissions()
        roles_permissions.role_id = d[0]
        roles_permissions.permission_id = d[1]
    
        await roles_permissions.save()
    })
}

function initData_Users_Roles() {
    let data = [
        [1, 1], [2, 2], [3, 3]
    ]

    data.forEach(async d => {
        let users_roles = new Users_Roles()
        users_roles.user_id = d[0]
        users_roles.role_id = d[1]
    
        await users_roles.save()
    })
}

function initData_Users() {
    let data = [
        [1, 'admin@zzzk.com', '123456', '管理员', 1, '18888888888', 1],
        [2, 'hr@zzzk.com', '123456', '人事管理', 10, '18888888888', 3],
        [3, 'test@zzzk.com', '123456', '测试员工', 4, '18888888888', 6]
    ]

    data.forEach(async d => {
        let user = new User()
        user.id = d[0]
        user.email = d[1]
        user.password = d[2]
        user.name = d[3]
        user.dept_id = d[4]
        user.phone = d[5]
        user.job_id = d[6]
    
        await user.save()
    })
}

function resetCache() {
    // import { RedisDao } from '../dao'
    // RedisDao.timeline_resetall()
}

initData()