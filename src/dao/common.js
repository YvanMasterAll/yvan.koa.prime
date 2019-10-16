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

        menus = this.mergeRelateData(results)
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
            if (UserDao.isAdminPermission(d.id)) {
                return {...d, label: d.name, disabled: true} 
            }
            return {...d, label: d.name, disabled: false} 
        })
        
        permissions = this.mergeRelateData(results)
        // 本地缓存
        await RedisDao.permission_tree_set(permissions)

        return permissions
    }

    /// 获取部门树
    static async depts_tree() {
        // 获取本地缓存
        let depts = await RedisDao.dept_tree()
        if (depts) { return depts }
        
        let results = (await Dept.findAll({where: {...global.enums.where}})).map(d => d.toJSON()).map(d => { return {...d, label: d.name} })

        depts = this.mergeRelateData(results)
        // 本地缓存
        await RedisDao.dept_tree_set(depts)

        return depts
    }

    /// 合并关联数据, 重组具有父子关系的数据, 像部门数据, 权限数据
    static mergeRelateData(depts) {
        let _depts = []
        depts.forEach(r => {
            let group = []
            let current = r
            // 获取数据组
            group.push(current)
            while (current && current.pid !== 0) { 
                current = depts.filter(r => r.id === current.pid)[0]
                if (current) { group.push(current) }
            }
            // 构建数据链
            let node = _depts // 操作节点
            for (let i = group.length - 1; i >= 0; i --) {
                let dept = group[i] // 要加入的节点
                let _dept = node.filter(r => r.id === dept.id)[0]
                if (!_dept) { node.push(dept) } // 如果节点不存在则加入
                if (i !== 0) { // 避免添加空的children, 因为children属性可以用来判断有没有子节点
                    if (!dept.children) { dept.children = [] }
                    node = dept.children // 更换操作节点
                }
            }
        })
        
        return _depts
    }

    /// 获取部门和它的子部门
    static async depts_children(deptids) {
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
}

export default CommonDao