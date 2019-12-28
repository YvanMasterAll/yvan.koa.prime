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
import Ticket_Activity from './workflow/ticket_activity'
import Ticket_Field from './workflow/ticket_field'
import Ticket_Request from './workflow/ticket_request'
import WK_Field from './workflow/wk_field'
import WK_Notice from './workflow/wk_notice'
import WK_Process from './workflow/wk_process'
import WK_State from './workflow/wk_state'
import WK_Transition from './workflow/wk_transition'

export { 
    User, Role, Dept, Job, Menu, Permission, Roles_Depts, Roles_Menus, Roles_Permissions, Users_Roles, Log,
    Ticket_Activity, Ticket_Field, Ticket_Request, WK_Field, WK_Notice, WK_Process, WK_State, WK_Transition
}

// 初始化数据库数据
import './mock'

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
    //         association: Users_Roles.hasMany(Roles_Depts, {as: 'roles_depts', foreignKey: 'role_id', sourceKey: 'role_id', constraints: false}),
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