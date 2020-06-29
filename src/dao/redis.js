import redis from '../utils/redis'
import moment from 'moment'

class RedisDao {

    /// 缓存用户状态

    static async user_tokened_set(id) {
        await redis.set(global.config.rkeys.user_tokened + id, true, global.config.app.expiresIn_redis)
    }

    static async user_tokened_del(id) {
        await redis.del(global.config.rkeys.user_tokened + id)
    } 

    static async user_tokened_get(id) {
        return await redis.get(global.config.rkeys.user_tokened + id)
    } 

    /// 缓存权限树

    static async permission_tree_set(permissions) {
        // 添加时间参数, 用于判断数据状态
        console.log('添加到本地缓存: permission_tree')
        return await redis.set_json(global.config.rkeys.permission_tree, {data: permissions, create_at: new Date().getTime()}, global.config.app.expiresIn_redis)
    }

    static async permission_tree() {
        let result = await redis.get_json(global.config.rkeys.permission_tree)
        if (result) { // 数据存在
            console.log('获取到本地缓存: permission_tree')
            return result.data
        }

        return result
    }

    /// 缓存菜单树

    static async menu_tree_set(menus) {
        // 添加时间参数, 用于判断数据状态
        console.log('添加到本地缓存: menu_tree')
        return await redis.set_json(global.config.rkeys.menu_tree, {data: menus, create_at: new Date().getTime()}, global.config.app.expiresIn_redis)
    }

    static async menu_tree() {
        let result = await redis.get_json(global.config.rkeys.menu_tree)
        if (result) { // 数据存在
            console.log('获取到本地缓存: menu_tree')
            return result.data
        }

        return result
    }

    /// 缓存部门树

    static async dept_tree_set(depts) {
        // 添加时间参数, 用于判断数据状态
        console.log('添加到本地缓存: dept_tree')
        return await redis.set_json(global.config.rkeys.dept_tree, {data: depts, create_at: new Date().getTime()}, global.config.app.expiresIn_redis)
    }

    static async dept_tree() {
        let result = await redis.get_json(global.config.rkeys.dept_tree)
        if (result) { // 数据存在
            console.log('获取到本地缓存: dept_tree')
            return result.data
        }

        return result
    }

    /// 缓存部门

    static async dept_all_set(depts) {
        // 添加时间参数, 用于判断数据状态
        console.log('添加到本地缓存: dept_all')
        return await redis.set_json(global.config.rkeys.dept_all, {data: depts, create_at: new Date().getTime()}, global.config.app.expiresIn_redis)
    }

    static async dept_all() {
        let result = await redis.get_json(global.config.rkeys.dept_all)
        if (result) { // 数据存在
            console.log('获取到本地缓存: dept_all')
            return result.data
        }

        return result
    }

    /// 缓存角色

    static async role_all_set(roles) {
        // 添加时间参数, 用于判断数据状态
        console.log('添加到本地缓存: role_all')
        return await redis.set_json(global.config.rkeys.role_all, {data: roles, create_at: new Date().getTime()}, global.config.app.expiresIn_redis)
    }

    static async role_all() {
        let result = await redis.get_json(global.config.rkeys.role_all)
        if (result) { // 数据存在
            console.log('获取到本地缓存: role_all')
            return result.data
        }

        return result
    }

    /// 缓存岗位

    static async job_all_set(jobs) {
        // 添加时间参数, 用于判断数据状态
        console.log('添加到本地缓存: job_all')
        return await redis.set_json(global.config.rkeys.job_all, {data: jobs, create_at: new Date().getTime()}, global.config.app.expiresIn_redis)
    }

    static async job_all() {
        let result = await redis.get_json(global.config.rkeys.job_all)
        if (result) { // 数据存在
            console.log('获取到本地缓存: job_all')
            return result.data
        }

        return result
    }

    /// 缓存权限

    static async permission_all_set(permissions) {
        // 添加时间参数, 用于判断数据状态
        console.log('添加到本地缓存: permission_all')
        return await redis.set_json(global.config.rkeys.permission_all, {data: permissions, create_at: new Date().getTime()}, global.config.app.expiresIn_redis)
    }

    static async permission_all() {
        let result = await redis.get_json(global.config.rkeys.permission_all)
        if (result) { // 数据存在
            console.log('获取到本地缓存: permission_all')
            return result.data
        }

        return result
    }

    /// 缓存权限

    static async menu_all_set(menus) {
        // 添加时间参数, 用于判断数据状态
        console.log('添加到本地缓存: menu_all')
        return await redis.set_json(global.config.rkeys.menu_all, {data: menus, create_at: new Date().getTime()}, global.config.app.expiresIn_redis)
    }

    static async menu_all() {
        let result = await redis.get_json(global.config.rkeys.menu_all)
        if (result) { // 数据存在
            console.log('获取到本地缓存: menu_all')
            return result.data
        }

        return result
    }

    /// 缓存工单面板数据
    /// ticket_todo(待处理的工单数) + time_month_commit(本月提交工单数) + ticket_month_finished(本月已完成工单数) + ticket_staff_active(员工活跃度) + ticket_category_distribute(工单分类分布)

    static async ticekt_panel_set(panel) {
        // 添加时间参数, 用于判断数据状态
        console.log('添加到本地缓存: ticket_panel')
        return await redis.set_json(global.config.rkeys.ticket_panel, {data: panel, create_at: new Date().getTime()}, null)
    }

    static async ticket_panel() {
        let result = await redis.get_json(global.config.rkeys.ticket_panel)
        if (result) { // 数据存在
            // 判断创建时间和当前时间是否同月，如果不同月就表示数据已失效
            let past = moment(time)
            let now = moment()
            console.log('判断ticket_panel面板数据的失效')
            console.log(past.year() + ':' + now.year() + ':' + past.month() + ':' + now.month())
            if (past.year() !== now.year() || past.month() !== now.month()) {
                return null
            }
            console.log('获取到本地缓存: ticket_panel')
            return result.data
        }

        return result
    }

    /// 清空所有缓存
    static async resetall() {
        console.log('重置缓存中...')
        for (var i in global.config.rkeys) {
            await redis.del(global.config.rkeys[i])
        }
    }
}

export default RedisDao