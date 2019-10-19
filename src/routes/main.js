import KoaRouter from 'koa-router'
import controllers from '../controllers'
import { permissionCheck } from '../middleware/permissions'

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
    user_list: { method: 'get', path: '/api/user/list', meta: { ...meta }, control: controllers.user.list, recache: [global.config.rkeys.time_permission] },
    user_add: { method: 'post', path: '/api/user/add', meta: { ...meta }, control: controllers.user.add, desc: '添加用户' },
    user_edit: { method: 'post', path: '/api/user/edit', meta: { ...meta }, control: controllers.user.edit, desc: '编辑用户' },
    user_del: { method: 'post', path: '/api/user/del', meta: { ...meta }, control: controllers.user.del, desc: '删除用户' },
    /// 角色模块
    role_list: { method: 'get', path: '/api/role/list', meta: { ...meta }, control: controllers.role.list },
    role_add: { method: 'post', path: '/api/role/add', meta: { ...meta }, control: controllers.role.add, desc: '添加角色', recache: [global.config.rkeys.time_role] },
    role_edit: { method: 'post', path: '/api/role/edit', meta: { ...meta }, control: controllers.role.edit, desc: '编辑角色', recache: [global.config.rkeys.time_role] },
    role_del: { method: 'post', path: '/api/role/del', meta: { ...meta }, control: controllers.role.del, desc: '删除角色', recache: [global.config.rkeys.time_role] },
    menu_edit: { method: 'post', path: '/api/role/menu_edit', meta: { ...meta }, control: controllers.role.menu_edit, desc: '编辑菜单权限' },
    permission_edit: { method: 'post', path: '/api/role/permission_edit', meta: { ...meta }, control: controllers.role.permission_edit, desc: '编辑资源权限' },
    /// 认证模块
    auth_signin: { method: 'post', path: '/api/auth/signin', meta: { ...meta, auth: false }, control: controllers.auth.signin, desc: '用户登录' },
    auth_signout: { method: 'post', path: '/api/auth/signout', meta: { ...meta, auth: false }, control: controllers.auth.signout, desc: '退出登录' },
    auth_refresh: { method: 'post', path: '/api/auth/refresh', meta: { ...meta, auth: false }, control: controllers.auth.refresh, desc: '更新token' },
    auth_check: { method: 'get', path: '/api/auth/check', meta: { ...meta, auth: false }, control: controllers.auth.check },
}

for (var i in routes) {
    let route = routes[i]
    if (route.method === 'post') {
        router.post(route.path, permissionCheck(route), requestDescription(route), route.control)
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
        if (route.path === routes.auth_signin.path) { // 如果是登录接口那么将密码覆盖同时提取用户名
            let params = ctx.request.query
            ctx.request_log.params = JSON.stringify({...params, password: '******'})
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

export { routes, jwt_exclude }
export default router
    
