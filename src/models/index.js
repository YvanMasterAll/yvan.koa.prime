import Book from './book'
import Student from './student'
import Record from './record'
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

module.exports = { 
    Book, Student, Record, User, Role, Dept, Job, Menu, Permission, Roles_Depts, Roles_Menus, Roles_Permissions, Users_Roles, Log
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
    // let data = [
    //     [1, '中正智控', 0], [2, '华南分部', 1], [3, '华北分部', 1], [4, '研发部', 2], [5, '运维部', 2], [6, '财务部', 2], [7, '市场部', 2], [8, '测试部', 3], [9, '行政部', 3], [10, '人事部', 3]
    // ]
    
    // data.forEach(async d => {
    //     let dept = new Dept()
    //     dept.id = d[0]
    //     dept.name = d[1]
    //     dept.pid = d[2]
    
    //     await dept.save()
    // })

    // // DATA: 岗位
    // data = [
    //     [1, '董事长', 1, 1], [2, '董事长秘书', 2, 1], [3, '人事专员', 3, 10], [4, '产品经理', 4, 4], [5, '软件测试', 5, 4], [6, '全栈开发', 6, 4]
    // ]
    
    // data.forEach(async d => {
    //     let job = new Job()
    //     job.id = d[0]
    //     job.name = d[1]
    //     job.sort = d[2]
    //     job.dept_id = d[3]
    
    //     await job.save()
    // })

    // // DATA: 菜单
    // // data = [ 
    // //     [1, '系统管理', null, 0, 1], [2, '用户管理', 'system/user/index', 1, 2], [3, '角色管理', 'system/role/index', 1, 3], [4, '权限管理', 'system/permission/index', 1, 4], [5, '菜单管理', 'system/menu/index', 1, 5], [6, '系统监控', null, 0, 10], [7, '操作日志', 'monitor/log/index', 6, 11], [8, '系统缓存', 'monitor/redis/index', 6, 13], [9, 'SQL监控', 'monitor/sql/index', 6, 14], [10, '组件管理', null, 0, 50], [11, '图标库', 'components/IconSelect', 10, 51], [14, '邮件工具', 'tools/email/index', 36, 24], [15, '富文本', 'components/Editor', 10, 52], [16, '图床管理', 'tools/picture/index', 36, 25], [17, '项目地址', null, 0, 0], [18, '存储管理', 'tools/storage/index', 36, 23], [19, '支付宝工具', 'tools/aliPay/index', 36, 27], [21, '多级菜单', null, 0, 900], [22, '二级菜单1', 'nested/menu1/index', 21, 999], [23, '二级菜单2', 'nested/menu2/index', 21, 999], [24, '三级菜单1', 'nested/menu1/menu1-1', 22, 999], [27, '三级菜单2', 'nested/menu1/menu1-2', 22, 999], [28, '定时任务', 'system/timing/index', 36, 21], [30, '代码生成', 'generator/index', 36, 22], [32, '异常日志', 'monitor/log/errorLog', 6, 12], [33, 'Markdown', 'components/MarkDown', 10, 53], [34, 'Yaml编辑器', 'components/YamlEdit', 10, 54], [35, '部门管理', 'system/dept/index', 1, 6], [36, '系统工具', null, 0, 20], [37, '岗位管理', 'system/job/index', 1, 7], [38, '接口文档', 'tools/swagger/index', 36, 26], [39, '字典管理', 'system/dict/index', 1, 8]
    // // ]
    // let data = global.enums.menus

    // data.forEach(async d => {
    //     let menu = new Menu()
    //     menu.id = d.id
    //     menu.name = d.name
    //     menu.path = d.path
    //     menu.pid = d.pid
    //     menu.sort = d.sort
    
    //     await menu.save()
    // })

    // // DATA: 权限
    // // data = [
    // //     [1, '超级管理员', 'ADMIN', 0], [2, '用户管理', 'USER_ALL', 0], [3, '用户查询', 'USER_SELECT', 2], [4, '用户创建', 'USER_CREATE', 2], [5, '用户编辑', 'USER_EDIT', 2], [6, '用户删除', 'USER_DELETE', 2], [7, '角色管理', 'ROLES_ALL', 0], [8, '角色查询', 'ROLES_SELECT', 7], [10, '角色创建', 'ROLES_CREATE', 7], [11, '角色编辑', 'ROLES_EDIT', 7], [12, '角色删除', 'ROLES_DELETE', 7], [13, '权限管理', 'PERMISSION_ALL', 0], [14, '权限查询', 'PERMISSION_SELECT', 13], [15, '权限创建', 'PERMISSION_CREATE', 13], [16, '权限编辑', 'PERMISSION_EDIT', 13], [17, '权限删除', 'PERMISSION_DELETE', 13], [18, '缓存管理', 'REDIS_ALL', 0], [20, '缓存查询', 'REDIS_SELECT', 18], [22, '缓存删除', 'REDIS_DELETE', 18], [23, '图床管理', 'PICTURE_ALL', 0], [24, '查询图片', 'PICTURE_SELECT', 23], [25, '上传图片', 'PICTURE_UPLOAD', 23], [26, '删除图片', 'PICTURE_DELETE', 23], [29, '菜单管理', 'MENU_ALL', 0], [30, '菜单查询', 'MENU_SELECT', 29], [31, '菜单创建', 'MENU_CREATE', 29], [32, '菜单编辑', 'MENU_EDIT', 29], [33, '菜单删除', 'MENU_DELETE', 29], [35, '定时任务管理', 'JOB_ALL', 0], [36, '任务查询', 'JOB_SELECT', 35], [37, '任务创建', 'JOB_CREATE', 35], [38, '任务编辑', 'JOB_EDIT', 35], [39, '任务删除', 'JOB_DELETE', 35], [40, '部门管理', 'DEPT_ALL', 0], [41, '部门查询', 'DEPT_SELECT', 40], [42, '部门创建', 'DEPT_CREATE', 40], [43, '部门编辑', 'DEPT_EDIT', 40], [44, '部门删除', 'DEPT_DELETE', 40], [45, '岗位管理', 'USERJOB_ALL', 0], [46, '岗位查询', 'USERJOB_SELECT', 45], [47, '岗位创建', 'USERJOB_CREATE', 45], [48, '岗位编辑', 'USERJOB_EDIT', 45], [49, '岗位删除', 'USERJOB_DELETE', 45], [50, '字典管理', 'DICT_ALL', 0], [51, '字典查询', 'DICT_SELECT', 50], [52, '字典创建', 'DICT_CREATE', 50], [53, '字典编辑', 'DICT_EDIT', 50], [54, '字典删除', 'DICT_DELETE', 50], [55, '文件管理', 'LOCALSTORAGE_ALL', 0], [56, '文件搜索', 'LOCALSTORAGE_SELECT', 55], [57, '文件上传', 'LOCALSTORAGE_CREATE', 55], [58, '文件编辑', 'LOCALSTORAGE_EDIT', 55], [59, '文件删除', 'LOCALSTORAGE_DELETE', 55]
    // // ]
    // data = global.enums.permissions

    // data.forEach(async d => {
    //     let permission = new Permission()
    //     permission.id = d.id
    //     permission.name = d.name
    //     permission.alias = d.alias
    //     permission.pid = d.pid
    
    //     await permission.save()
    // })

    // // DATA: 角色
    // data = [
    //     [1, '超级管理员', '·', 'all', 1], [2, '普通管理员', '普通管理员级别为2，使用该角色新增用户时只能赋予比普通管理员级别低的角色', 'diy', 2], [3, '普通用户', '用于测试菜单与权限', 'diy', 3]
    // ]

    // data.forEach(async d => {
    //     let role = new Role()
    //     role.id = d[0]
    //     role.name = d[1]
    //     role.remark = d[2]
    //     role.scope = d[3]
    //     role.level = d[4]
    
    //     await role.save()
    // })

    // // DATA: 角色的部门权限
    // data = [
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

    // DATA: 角色的菜单权限
    // data = [ 
    //     [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [8, 3], [9, 3], [10, 3], [11, 3], [14, 3], [15, 3], [16, 3], [17, 3], [18, 3], [19, 3], [21, 3], [22, 3], [23, 3], [24, 3], [27, 3], [28, 3], [30, 3], [33, 3], [34, 3], [35, 3], [36, 3], [37, 3], [38, 3], [39, 3], [1, 2], [2, 2],
    // ]

    // data.forEach(async d => {
    //     let roles_menus = new Roles_Menus()
    //     roles_menus.menu_id = d[0]
    //     roles_menus.role_id = d[1]
    
    //     await roles_menus.save()
    // })

    // // DATA: 角色的资源权限
    // data = [ 
    //     [1, 1], [2, 3], [2, 4], [2, 5], [3, 3], [3, 8], [3, 14], [3, 20], [3, 23], [3, 24], [3, 25], [3, 26], [3, 30], [3, 36], [3, 41], [3, 46], [3, 51],
    // ]

    // data.forEach(async d => {
    //     let roles_permissions = new Roles_Permissions()
    //     roles_permissions.role_id = d[0]
    //     roles_permissions.permission_id = d[1]
    
    //     await roles_permissions.save()
    // })

    // // DATA: 用户角色
    // data = [
    //     [1, 1], [2, 2], [3, 3]
    // ]

    // data.forEach(async d => {
    //     let users_roles = new Users_Roles()
    //     users_roles.user_id = d[0]
    //     users_roles.role_id = d[1]
    
    //     await users_roles.save()
    // })

    // // DATA: 用户
    // data = [
    //     [1, 'admin@eladmin.net', 'e10adc3949ba59abbe56e057f20f883e', 'admin', 4, '18888888888', 6],
    //     [2, 'test@eladmin.net', 'e10adc3949ba59abbe56e057f20f883e', 'test', 4, '17777777777', 5],
    //     [3, 'hr@eladmin.net', 'e10adc3949ba59abbe56e057f20f883e', 'hr', 10, '15555555555', 3]
    // ]

    // data.forEach(async d => {
    //     let user = new User()
    //     user.id = d[0]
    //     user.email = d[1]
    //     user.password = d[2]
    //     user.name = d[3]
    //     user.dept_id = d[4]
    //     user.phone = d[5]
    //     user.job_id = d[6]
    
    //     await user.save()
    // })
}

initData()