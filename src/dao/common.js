import { Dept, Role, Job, Permission, Menu } from '../models'
import UserDao from './user'
import RedisDao from './redis'

class CommonDao {

    /// 获取菜单树
    static async menus_tree() {
        // 获取本地缓存
        let menus = await RedisDao.menu_tree()
        if (menus) { return menus }

        let results = (await Menu.findAll({where: {...global.enums.where}})).map(d => d.toJSON()).map(d => { return {...d, label: d.name} })

        menus = this.buildTree(results)
        // 本地缓存
        await RedisDao.menu_tree_set(menus)

        return menus
    }

    /// 获取权限树
    static async permissions_tree() {
        // 获取本地缓存
        let permissions = await RedisDao.permission_tree()
        if (permissions) { return permissions }

        let results = (await Permission.findAll({where: {...global.enums.where}, order: ['id']})).map(d => d.toJSON()).map(d => { 
            if (UserDao.isAdminPermission(d.id)) { // 这里添加label和disabled属性方便前端显示
                return {...d, label: d.name, disabled: true} 
            }
            return {...d, label: d.name, disabled: false} 
        })
        
        permissions = this.buildTree(results)
        // 本地缓存
        await RedisDao.permission_tree_set(permissions)

        return permissions
    }

    /// 获取部门树
    static async depts_tree() {
        // 获取本地缓存
        let depts = await RedisDao.dept_tree()
        if (depts) { return depts }
        
        let results = (await this.depts()).map(d => { return {...d, label: d.name} })

        depts = this.buildTree(results)
        // 本地缓存
        await RedisDao.dept_tree_set(depts)

        return depts
    }

    /// 为一些数据建立树结构
    static buildTree(data) {
        let tree = []
        data.forEach(r => {
            let path = []
            let node = r
            // 通过父子关系获取路径上所有的节点
            path.push(node)
            while (node && node.pid !== 0) { 
                node = data.filter(r => r.id === node.pid)[0]
                if (node) { path.push(node) }
            }
            // 当前操作的节点
            node = tree
            // 将路径上的节点合并到树上
            for (let i = path.length - 1; i >= 0; i --) {
                let current_node = path[i] // 要合并的节点
                // 如果要合并的节点不存在，直接添加该节点
                if (!node.filter(r => r.id === current_node.id)[0]) { node.push(current_node) } 
                if (i !== 0) { // 这个判断是为了避免在遍历结束时添加空的children
                    if (!current_node.children) { current_node.children = [] }
                    node = current_node.children // 更换操作节点
                }
            }
        })
        
        return tree
    }

    /// 获取部门和它所有的子部门
    static async depts_withChildren(deptids) {
        // 获取本地缓存
        let depts = await RedisDao.dept_all()
        if (!depts) { 
            depts = (await Dept.findAll({where: {...global.enums.where}})).map(d => d.toJSON())
            // 本地缓存
            await RedisDao.dept_all_set(depts)
        }
        let _depts = []

        deptids.forEach(id => {
            let dept = depts.filter(d => d.id === id)[0]
            if (_depts.filter(d => d.id === dept.id).length === 0) {
                _depts.push(dept)
            }
            if (dept) { findChildren(dept) }
        })

        function findChildren(dept) {
            let k = depts.filter(d => d.pid === dept.id)
            k.forEach(d => {
                if (_depts.filter(d2 => d2.id === d.id).length === 0) {
                    _depts.push(d)
                    findChildren(d)
                }
            })
        }

        return _depts
    }
    
    /// 获取角色
    static async roles() {
        // 获取本地缓存
        let roles = await RedisDao.role_all()
        if (roles) { return roles }

        roles = (await Role.findAll({where: {...global.enums.where}})).map (d => { return d.toJSON() })
        // 本地缓存
        await RedisDao.role_all_set(roles)

        return roles
    }

    /// 获取岗位
    static async jobs() {
        // 获取本地缓存
        let jobs = await RedisDao.job_all()
        if (jobs) { return jobs }

        jobs = (await Job.findAll({where: {...global.enums.where}})).map (d => { return d.toJSON() })
        // 本地缓存
        await RedisDao.job_all_set(jobs)

        return jobs
    }

    /// 获取权限
    static async permissions() {
        // 获取本地缓存
        let permissions = await RedisDao.permission_all()
        if (permissions) { return permissions }

        permissions = (await Permission.findAll({where: {...global.enums.where}})).map (d => { return d.toJSON() })
        // 本地缓存
        await RedisDao.permission_all_set(permissions)

        return permissions
    }

    /// 获取部门
    static async depts() {
        // 获取本地缓存
        let depts = await RedisDao.dept_all()
        if (depts) { return depts }

        depts = (await Dept.findAll({where: {...global.enums.where}})).map (d => { return d.toJSON() })
        // 本地缓存
        await RedisDao.dept_all_set(depts)

        return depts
    }

    /// 获取菜单
    static async menus() {
        // 获取本地缓存
        let menus = await RedisDao.menu_all()
        if (menus) { return menus }

        menus = (await Menu.findAll({where: {...global.enums.where}})).map (d => { return d.toJSON() }) 
        // 本地缓存
        await RedisDao.menu_all_set(menus)

        return menus
    }

    /// 验证部门有效性
    static async validate_dept(id) {
        let dept = (await Dept.findOne({
            where: {
                id: id, 
                ...global.enums.where
            },
            raw: true
        }))
        if (!dept) { throw new global.errs.ParamsIllegal("请选择正确的部门") }
    }

    /// 验证岗位有效性
    static async validate_job(id, dept_id) {
        let job = (await Job.findOne({
            where: {
                id: id, 
                dept_id: dept_id,
                ...global.enums.where
            },
            raw: true
        }))
        if (!job) { throw new global.errs.ParamsIllegal("请选择正确的岗位·") }
    }
}

export default CommonDao