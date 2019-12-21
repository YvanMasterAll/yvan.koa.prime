import User from './user'
import Role from './role'
import Dept from './dept'
import Job from './job'
import Menu from './menu'
import Permission from './permission'
import Roles_Depts from './roles_depts'
import Roles_Menus from './roles_menus'
import Roles_Permissions from './roles_permissions'
import Users_Roles from './users_roles'
import Log from './log'

export { 
    User, Role, Dept, Job, Menu, Permission, Roles_Depts, Roles_Menus, Roles_Permissions, Users_Roles, Log
}

// 测试数据库查询
async function testSQL() {
    // // 测试关联查询
    // let results = (await Users_Roles.findAll({
    //     include: [{
    //         model: User,
    //         required: true
    //     }, {
    //         model: Role,
    //         required: true
    //     }, {
    //         association: Users_Roles.hasMany(Roles_Depts, {as: 'roles_depts', foreignKey: 'role_id', targetKey: 'role_id', constraints: false}),
    //         include: [{
    //             model: Dept,
    //             required: true
    //         }]
    //     }]
    // })).map(d => {
    //     return d.toJSON()
    // })
    // console.log(results)

    // // 测试权限整理
    // let results = (await Permission.findAll()).map (d => {
    //     return d.toJSON()
    // })
    // let perms = []
    // results.forEach(r => {
    //     let path = r.alias
    //     r.path = findPath(results, path, r)
    //     perms.push(r)
    // })
    // function findPath(source, path, obj) {
    //     if (obj.pid === 0) {
    //         return path
    //     } else {
    //         let parent = source.filter(d => d.id === obj.pid)[0]
    //         if (!parent) {
    //             return path
    //         } else {
    //             path = path + '/' + parent.alias
    //             return findPath(source, path, parent)
    //         }
    //     }
    // }
    // console.log(perms)
    
    // let results = (await Permission.findAll()).map (d => {
    //     return d.toJSON()
    // })
    // let perms = {}
    // results.forEach(r => {
    //     if (r.pid === 0 && !perms[r.id]) {
    //         perms[r.id] = r
    //     } else {
    //         // 权限路径
    //         let path = findPath(results, [], r)
    //         let pathData = {}
    //         path.forEach(p => {
    //             pathData = perms[p.id]
    //             if (!pathData) {
    //                 perms[p.id] = p
    //             }
    //             pathData = perms[p.id]
    //         })
    //         if (!pathData[r.id]) { 
    //             pathData[r.id] = r
    //         }
    //     }
    // })
    // console.log(results)
    // console.log(perms)
    // function findPath(source, path, obj) {
    //     let parent = source.filter(d => d.id === obj.pid)[0]
    //     if (!parent) { return path }

    //     path.push(parent)
    //     if (parent.pid !== 0) {
    //         findPath(source, path, parent)
    //     }

    //     return path
    // }

    // 测试部门整理
    // let results = (await Dept.findAll()).map(d => d.toJSON())
    // let depts = []
    // results.forEach(r => {
    //     if (r.pid === 0) {
    //         depts.push(r)
    //     }
    //     results.forEach(r2 => {
    //         if (r2.pid === r.id) {
    //             if (!r.children) {
    //                 r.children = [r2]
    //             } else {
    //                 r.children.push(r2)
    //             }
    //         }
    //     })
    // })
    // console.log(depts[0].children)
}

testSQL()

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
        [1, '中正智控', 0], [2, '华南分部', 1], [3, '华北分部', 1], [4, '研发部', 2], [5, '运维部', 2], [6, '财务部', 2], [7, '市场部', 2], [8, '测试部', 3], [9, '行政部', 3], [10, '人事部', 3]
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
        [1, '董事长', 1, 1], [2, '董事长秘书', 2, 1], [3, '人事专员', 3, 10], [4, '产品经理', 4, 4], [5, '软件测试', 5, 4], [6, '全栈开发', 6, 4]
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
        [1, '超级管理员', '·', 'all', 1], [2, '普通管理员', '普通管理员级别为2，使用该角色新增用户时只能赋予比普通管理员级别低的角色', 'diy', 2], [3, '普通用户', '用于测试菜单与权限', 'diy', 3]
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
    let data = [
        [1, 2, 5],
        [2, 3, 8],
        [3, 3, 2],
        [4, 2, 3],
        [5, 2, 6]
    ]

    data.forEach(async d => {
        let roles_depts = new Roles_Depts()
        roles_depts.id = d[0]
        roles_depts.role_id = d[1]
        roles_depts.dept_id = d[2]
    
        await roles_depts.save()
    })
}

function initData_Roles_Menus() {
    let data = [ 
        [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [8, 3], [9, 3], [10, 3], [11, 3], [14, 3], [15, 3], [16, 3], [17, 3], [18, 3], [19, 3], [21, 3], [22, 3], [23, 3], [24, 3], [27, 3], [28, 3], [30, 3], [33, 3], [34, 3], [35, 3], [36, 3], [37, 3], [38, 3], [39, 3], [1, 2], [2, 2],
    ]

    data.forEach(async d => {
        let roles_menus = new Roles_Menus()
        roles_menus.menu_id = d[0]
        roles_menus.role_id = d[1]
    
        await roles_menus.save()
    })
}

function initData_Roles_Perms() {
    let data = [ 
        [1, 1], [2, 3], [2, 4], [2, 5], [3, 3], [3, 8], [3, 14], [3, 30], [3, 33], [3, 34], [3, 35], [3, 36], [3, 38], [3, 43], [3, 16], [3, 21], [3, 48],
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
        [1, 'admin@eladmin.net', 'admin', 'admin', 4, '18888888888', 6],
        [2, 'test@eladmin.net', 'test', 'test', 4, '17777777777', 5],
        [3, 'hr@eladmin.net', 'hr', 'hr', 10, '15555555555', 3]
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