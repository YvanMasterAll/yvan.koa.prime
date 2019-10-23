import redis from '../utils/redis'

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
        return await redis.set_json(global.config.rkeys.permission_tree, {data: permissions, create_at: new Date().getTime()}, global.config.app.expiresIn_redis)
    }

    static async permission_tree() {
        let result = await redis.get_json(global.config.rkeys.permission_tree)
        if (result) { // 数据存在
            let tl_permission = await this.timeline_get(global.config.rkeys.time_permission)
            let time = result.create_at
            if (this.validate_timeline(time, [tl_permission])) {
                console.log('获取到本地缓存: permission_tree')
                return result.data
            } else {
                return null
            }
        }

        return result
    }

    /// 缓存菜单树

    static async menu_tree_set(menus) {
        // 添加时间参数, 用于判断数据状态
        return await redis.set_json(global.config.rkeys.menu_tree, {data: menus, create_at: new Date().getTime()}, global.config.app.expiresIn_redis)
    }

    static async menu_tree() {
        let result = await redis.get_json(global.config.rkeys.menu_tree)
        if (result) { // 数据存在
            let tl_menu = await this.timeline_get(global.config.rkeys.time_menu)
            let time = result.create_at
            if (this.validate_timeline(time, [tl_menu])) {
                console.log('获取到本地缓存: menu_tree')
                return result.data
            } else {
                return null
            }
        }

        return result
    }

    /// 缓存部门树

    static async dept_tree_set(depts) {
        // 添加时间参数, 用于判断数据状态
        return await redis.set_json(global.config.rkeys.dept_tree, {data: depts, create_at: new Date().getTime()}, global.config.app.expiresIn_redis)
    }

    static async dept_tree() {
        let result = await redis.get_json(global.config.rkeys.dept_tree)
        if (result) { // 数据存在
            let tl_dept = await this.timeline_get(global.config.rkeys.time_dept)
            let time = result.create_at
            if (this.validate_timeline(time, [tl_dept])) {
                console.log('获取到本地缓存: dept_tree')
                return result.data
            } else {
                return null
            }
        }

        return result
    }

    /// 缓存部门

    static async dept_all_set(depts) {
        // 添加时间参数, 用于判断数据状态
        return await redis.set_json(global.config.rkeys.dept_all, {data: depts, create_at: new Date().getTime()}, global.config.app.expiresIn_redis)
    }

    static async dept_all() {
        let result = await redis.get_json(global.config.rkeys.dept_all)
        if (result) { // 数据存在
            let tl_dept = await this.timeline_get(global.config.rkeys.time_dept)
            let time = result.create_at
            if (this.validate_timeline(time, [tl_dept])) {
                console.log('获取到本地缓存: dept_all')
                return result.data
            } else {
                return null
            }
        }

        return result
    }

    /// 缓存角色

    static async role_all_set(roles) {
        // 添加时间参数, 用于判断数据状态
        return await redis.set_json(global.config.rkeys.role_all, {data: roles, create_at: new Date().getTime()}, global.config.app.expiresIn_redis)
    }

    static async role_all() {
        let result = await redis.get_json(global.config.rkeys.role_all)
        if (result) { // 数据存在
            let tl_role = await this.timeline_get(global.config.rkeys.time_role)
            let time = result.create_at
            if (this.validate_timeline(time, [tl_role])) {
                console.log('获取到本地缓存: role_all')
                return result.data
            } else {
                return null
            }
        }

        return result
    }

    /// 缓存岗位

    static async job_all_set(jobs) {
        // 添加时间参数, 用于判断数据状态
        return await redis.set_json(global.config.rkeys.job_all, {data: jobs, create_at: new Date().getTime()}, global.config.app.expiresIn_redis)
    }

    static async job_all() {
        let result = await redis.get_json(global.config.rkeys.job_all)
        if (result) { // 数据存在
            let tl_job = await this.timeline_get(global.config.rkeys.time_job)
            let time = result.create_at
            if (this.validate_timeline(time, [tl_job])) {
                console.log('获取到本地缓存: job_all')
                return result.data
            } else {
                return null
            }
        }

        return result
    }

    /// 缓存权限

    static async permission_all_set(permissions) {
        // 添加时间参数, 用于判断数据状态
        return await redis.set_json(global.config.rkeys.permission_all, {data: permissions, create_at: new Date().getTime()}, global.config.app.expiresIn_redis)
    }

    static async permission_all() {
        let result = await redis.get_json(global.config.rkeys.permission_all)
        if (result) { // 数据存在
            let tl_permission = await this.timeline_get(global.config.rkeys.time_permission)
            let time = result.create_at
            if (this.validate_timeline(time, [tl_permission])) {
                console.log('获取到本地缓存: permission_all')
                return result.data
            } else {
                return null
            }
        }

        return result
    }

    /// 缓存权限

    static async menu_all_set(menus) {
        // 添加时间参数, 用于判断数据状态
        return await redis.set_json(global.config.rkeys.menu_all, {data: menus, create_at: new Date().getTime()}, global.config.app.expiresIn_redis)
    }

    static async menu_all() {
        let result = await redis.get_json(global.config.rkeys.menu_all)
        if (result) { // 数据存在
            let tl_menu = await this.timeline_get(global.config.rkeys.time_menu)
            let time = result.create_at
            if (this.validate_timeline(time, [tl_menu])) {
                console.log('获取到本地缓存: menu_all')
                return result.data
            } else {
                return null
            }
        }

        return result
    }

    /// 时间线

    static async timeline_get(key) {
        return await redis.get(key)
    }

    static async timeline_reset(key) {
        await redis.set(key, new Date().getTime(), global.config.app.expiresIn_redis)
    }

    static async timeline_resetall() {
        for (var i in global.config.rkeys) {
            await redis.set(global.config.rkeys[i], new Date().getTime(), global.config.app.expiresIn_redis)
        }
    }

    /// 判断时间线
    static validate_timeline(time, timelines) {
        let cool = true
        timelines.forEach(tl => {
            if (tl && time < tl) {
                cool = false
                return false
            }
        })

        return cool
    }
}

export default RedisDao