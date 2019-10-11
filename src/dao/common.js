import { Dept, Role } from '../models'

class CommonDao {

    /// 获取部门信息
    static async depts() {
        let results = (await Dept.findAll({where: {...global.enums.where}})).map(d => d.toJSON())

        return this.sortDepts(results)
    }

    /// 整理部门信息
    static async sortDepts(depts) {
        let _depts = []
        depts.forEach(r => {
            let group = []
            let current = r
            // 获取部门组
            group.push(current)
            while (current && current.pid !== 0) { 
                current = depts.filter(r => r.id === current.pid)[0]
                if (current) { group.push(current) }
            }
            // 构建部门链
            let node = _depts // 操作节点
            for (let i = group.length - 1; i >= 0; i --) {
                let dept = group[i] // 要加入的部门
                let _dept = node.filter(r => r.id === dept.id)[0]
                if (!_dept) { node.push(dept) } // 如果部门不存在则加入
                if (i !== 0) { // 避免添加空的children, 因为children属性可以用来判断有没有子部门
                    if (!dept.children) { dept.children = [] }
                    node = dept.children // 更换操作节点
                }
            }
        })
        
        return _depts
    }

    /// 获取包括部门在内的所有子部门
    static async depts_children(deptids) {
        let depts = (await Dept.findAll({where: {...global.enums.where}})).map(d => d.toJSON())
        let _depts = []

        deptids.forEach(id => {
            let dept = depts.filter(d => d.id === id)[0]
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
        return (await Role.findAll({where: {...global.enums.where}})).map (d => {
            return d.toJSON()
        })
    }
}

export default CommonDao