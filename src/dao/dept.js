import { Dept, User, Job } from '../models'
const Sequelize = require('sequelize')
const { doTransaction } = require('../utils/db')
import { CommonDao } from '../dao'
var _ = require('lodash')

class DeptDao {

    /// 获取部门列表
    static async dept_list(where) {
        if (_.isEmpty(where)) { // 如果查询条件为空
            return await CommonDao.depts_tree()
        }
        
        let results = await Dept.findAll({
            where: { ...global.enums.where, ...where }
        }).map(d => { return d.toJSON() })

        let fdata = []
        let depts = await CommonDao.depts()
        if (results.length > 1) {
            results.forEach(r => { // 部门去重, 去除父子关系
                let group = []
                let current = r
                // 获取数据组
                while (current && current.pid !== 0) { 
                    current = depts.filter(r => r.id === current.pid)[0]
                    if (current) { group.push(current.id) }
                }
                let cool = group.some(g => results.filter(r => r.id === g).length > 0)
                if (!cool) { fdata.push(r) }
            })
        } else { fdata = results }

        let depts_tree = await CommonDao.depts_tree()
        let data = []
        fdata.forEach(r => { // 查找部门树
            function find(t) {
                t.forEach(d => {
                    if (d.id === r.id) { 
                        data.push(d)
                        return false
                    }
                    if (d.children) { find(d.children) }
                })
            }
            find(depts_tree)
        })

        return data
    }

    /// 新增部门
    static async dept_add(name, pid) {
        // 创建部门
        let dept = new Dept()
        dept.name = name
        dept.pid = pid
        await dept.save()
    }

    /// 编辑部门
    static async dept_edit(isRoot, id, name, pid) {
        if (isRoot) {
            await Dept.update({name, update_at: new Date()}, {where: {id}})
        } else {
            await Dept.update({name, pid, update_at: new Date()}, {where: {id}})
        }
    }

    /// 编辑部门
    static async dept_del(id) {
        // 删除部门
        await Dept.update({ state: global.enums.state.del, update_at: new Date() }, { where: {id: id} })
    }

    /// 判断根部门
    static async isRootDept(id, dept) {
        if (dept) { return dept.pid === 0 }
        
        let root = await Dept.findOne({
            where: { ...global.enums.where, pid: 0 },
            raw: true
        })
        return root && root.id === id
    }

    /// 判断部门存在
    static async dept_exists(where) {
        let count = await Dept.count({
            where: { ...where, ...global.enums.where }
        })
        return (count > 0)
    }

    /// 判断部门删除
    static async validate_dept_del(id) {
        // 判断是否包含子部门
        let depts_tree = await CommonDao.depts_tree()
        let node = []
        function find(t) { // 查找部门树
            t.forEach(d => {
                if (d.id === id) { 
                    node = d
                    return false
                }
                if (d.children) { find(d.children) }
            })
        }
        find(depts_tree)
        if (node.children) { throw new global.errs.iError("无法删除该部门(存在子部门)") }
        // 查找子部门
        let children = [id]
        function find_children(t) { // 查找子部门
            t.forEach(d => {
                children.push(d.id)
                if (d.children) { find_children(d.children) }
            })
        }
        node.children && find_children(node.children)
        // 判断是否存在可用岗位
        let result = await Job.findOne({ where: { dept_id: {[Sequelize.Op.in]: children}, ...global.enums._where }})
        if (result) { throw new global.errs.iError("无法删除该部门(存在可用岗位)") }
        // 判断是否存在可用用户
        result = await User.findOne({ where: { dept_id: {[Sequelize.Op.in]: children}, ...global.enums._where }})
        if (result) { throw new global.errs.iError("无法删除该部门(存在可用用户)") }
    }
}

export default DeptDao