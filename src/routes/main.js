import KoaRouter from 'koa-router'
import controllers from '../controllers'
import { permissionCheck } from '../middleware/permissions'
const multer = require('koa-multer')

const router = new KoaRouter()

let meta = { auth: true }

const routes = {
    /// 通用模块
    depts: { method: 'get', path: '/api/common/depts', meta: { ...meta, auth: false }, control: controllers.common.depts },
    roles: { method: 'get', path: '/api/common/roles', meta: { ...meta, auth: false }, control: controllers.common.roles },
    jobs: { method: 'get', path: '/api/common/jobs', meta: { ...meta, auth: false }, control: controllers.common.jobs },
    permissions: { method: 'get', path: '/api/common/permissions', meta: { ...meta, auth: false }, control: controllers.common.permissions },
    menus: { method: 'get', path: '/api/common/menus', meta: { ...meta, auth: false }, control: controllers.common.menus },
    /// 用户模块
    user_list: { method: 'get', path: '/api/user/list', meta: { ...meta }, control: controllers.user.list },
    user_add: { method: 'post', path: '/api/user/add', meta: { ...meta }, control: controllers.user.add, desc: '添加用户' },
    user_edit: { method: 'post', path: '/api/user/edit', meta: { ...meta }, control: controllers.user.edit, desc: '编辑用户' },
    user_del: { method: 'post', path: '/api/user/del', meta: { ...meta }, control: controllers.user.del, desc: '删除用户' },
    user_profile: { method: 'get', path: '/api/user/profile', meta: { ...meta, auth: false }, control: controllers.user.profile },
    user_update_avatar: { method: 'post', path: '/api/user/update_avatar', upload: 'images/avatar', meta: { ...meta, auth: false }, control: controllers.user.update_avatar, desc: '更新头像' },
    user_update_email: { method: 'post', path: '/api/user/update_email', meta: { ...meta, auth: false }, control: controllers.user.update_email, desc: '更新邮箱' },
    user_update_password: { method: 'post', path: '/api/user/update_password', meta: { ...meta, auth: false }, control: controllers.user.update_password, desc: '更新密码' },
    /// 角色模块
    role_list: { method: 'get', path: '/api/role/list', meta: { ...meta }, control: controllers.role.list },
    role_add: { method: 'post', path: '/api/role/add', meta: { ...meta }, control: controllers.role.add, desc: '添加角色', recache: [global.config.rkeys.time_role] },
    role_edit: { method: 'post', path: '/api/role/edit', meta: { ...meta }, control: controllers.role.edit, desc: '编辑角色', recache: [global.config.rkeys.time_role] },
    role_del: { method: 'post', path: '/api/role/del', meta: { ...meta }, control: controllers.role.del, desc: '删除角色', recache: [global.config.rkeys.time_role] },
    menu_edit: { method: 'post', path: '/api/role/menu_edit', meta: { ...meta }, control: controllers.role.menu_edit, desc: '编辑菜单权限' },
    permission_edit: { method: 'post', path: '/api/role/permission_edit', meta: { ...meta }, control: controllers.role.permission_edit, desc: '编辑资源权限' },
    /// 部门模块
    dept_list: { method: 'get', path: '/api/dept/list', meta: { ...meta }, control: controllers.dept.list },
    dept_add: { method: 'post', path: '/api/dept/add', meta: { ...meta }, control: controllers.dept.add, desc: '添加部门', recache: [global.config.rkeys.time_dept] },
    dept_edit: { method: 'post', path: '/api/dept/edit', meta: { ...meta }, control: controllers.dept.edit, desc: '编辑部门', recache: [global.config.rkeys.time_dept] },
    dept_del: { method: 'post', path: '/api/dept/del', meta: { ...meta }, control: controllers.dept.del, desc: '删除部门', recache: [global.config.rkeys.time_dept] },
    /// 部门模块
    job_list: { method: 'get', path: '/api/job/list', meta: { ...meta }, control: controllers.job.list },
    job_add: { method: 'post', path: '/api/job/add', meta: { ...meta }, control: controllers.job.add, desc: '添加部门', recache: [global.config.rkeys.time_job] },
    job_edit: { method: 'post', path: '/api/job/edit', meta: { ...meta }, control: controllers.job.edit, desc: '编辑部门', recache: [global.config.rkeys.time_job] },
    job_del: { method: 'post', path: '/api/job/del', meta: { ...meta }, control: controllers.job.del, desc: '删除部门', recache: [global.config.rkeys.time_job] },
    /// 认证模块
    auth_signin: { method: 'post', path: '/api/auth/signin', meta: { ...meta, auth: false }, control: controllers.auth.signin, desc: '用户登录' },
    auth_signout: { method: 'post', path: '/api/auth/signout', meta: { ...meta, auth: false }, control: controllers.auth.signout, desc: '退出登录' },
    auth_refresh: { method: 'post', path: '/api/auth/refresh', meta: { ...meta, auth: false }, control: controllers.auth.refresh, desc: '更新token' },
    auth_check: { method: 'get', path: '/api/auth/check', meta: { ...meta, auth: false }, control: controllers.auth.check },
}

for (var i in routes) {
    let route = routes[i]
    if (route.method === 'post') {
        if (route.upload) {
            router.post(route.path, permissionCheck(route), requestDescription(route), uploadFactory(route.upload).single('upload'), route.control)
        } else if (route.uploads) {
            router.post(route.path, permissionCheck(route), requestDescription(route), uploadFactory(route.upload).array('uploads'), route.control)
        } else {
            router.post(route.path, permissionCheck(route), requestDescription(route), route.control)
        }
    }
    if (route.method === 'get') {
        router.get(route.path, permissionCheck(route), requestDescription(route), route.control)
    }
}

function requestDescription(route) { // 给请求添加描述用于日志记录
    return async (ctx, next) => {
        if (route.recache) { // 重置本地缓存, 目前还是测试阶段
            ctx.recache = route.recache
        }
        if (route.path === routes.auth_signin.path || route.path === routes.user_update_email || route.path === routes.user_update_password) { // 如果是登录接口那么将密码覆盖同时提取用户名
            let params = ctx.request.query
            ctx.request_log.params = JSON.stringify({...params, password: '******', old: '******'})
            ctx.request_log.name = params.name
        }
        ctx.request_log.description = route.desc
        return next()
    }
}

// 不需要身份认证的路由
const jwt_exclude = [ 
    /^\/api\/auth\/signin/,
    /^\/api\/auth\/signup/,
    /^((?!\/api).)*$/ // 设置除了私有接口外的其它资源, 可以不需要认证访问
]

// 文件接收处理
function uploadFactory(path) {
    var storage = multer.diskStorage({
        // 文件保存路径
        destination: function (req, file, cb) {
            let _path = 'assets/' + path
            cb(null, _path)
        },
        // 修改文件名称
        filename: function (req, file, cb) {
            let type = file.originalname.split('.')[1] // 以点分割成数组, 数组的最后一项就是后缀名
            cb(null, `${file.fieldname}-${Date.now().toString(16)}.${type}`)
        }
    })
    //加载配置
    return multer({ storage: storage })
}

export { routes, jwt_exclude }
export default router
    
