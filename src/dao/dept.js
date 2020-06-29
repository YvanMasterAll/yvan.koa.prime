import { Dept, User, Job } from '../models'
const Sequelize = require('sequelize')
const { doTransaction } = require('../utils/db')
import { CommonDao } from '../dao'
var _ = require('lodash')

class DeptDao {

    /// 获取部门列表
    static async dept_list(where) {
        if (_.isEmpty(where)) { // 如果查询条件为空，直接返回部门树
            return await CommonDao.depts_tree()
        }
        // 如果带有查询条件
        // 1.部门查询
        let depts = await Dept.findAll({
            where: { ...global.enums.where_notdel, ...where }
        }).map(d => { return d.toJSON() })
        let depts_all = await CommonDao.depts()
        // 2.部门去重，查找出所有部门的上级部门并去重
        let depts_distinct = []
        let is_exists = function(dept) { // 去重函数
            return depts_distinct.filter(r => r.id == dept.id).length > 0
        }
        depts.forEach(r => {
            let node = r
            if (!is_exists(r)) { depts_distinct.push(r) }
            // 查找所有上级部门
            while (node && node.pid !== 0) { 
                node = depts_all.filter(r => r.id === node.pid)[0]
                if (node) { 
                    if (!is_exists(node)) { depts_distinct.push(node) }
                }
            }
        })
        // 3.构建部门树
        let depts_tree = CommonDao.buildTree(depts_distinct)

        return depts_tree
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
        if (isRoot) { // 根部门的pid保持不变
            await Dept.update({name, update_at: new Date()}, {where: {id}})
        } else {
            await Dept.update({name, pid, update_at: new Date()}, {where: {id}})
        }
    }

    /// 删除部门
    static async dept_del(id) {
        // 删除部门
        await Dept.update({ state: global.enums.state.del, update_at: new Date() }, { where: {id: id} })
    }

    /// 判断是否根部门
    static async isRootDept(id, dept) {
        if (dept) { return dept.pid === 0 }
        
        let root = await Dept.findOne({
            where: { ...global.enums.where, pid: 0 },
            raw: true
        })
        return root && root.id === id
    }

    /// 判断部门是否存在
    static async dept_exists(where) {
        let count = await Dept.count({
            where: { ...where, ...global.enums.where }
        })
        return (count > 0)
    }

    /// 获取部门
    static async dept_get(where) {
        let dept = await Dept.findOne({
            where: { ...where }
        })
        if (dept) {
            return dept.toJSON()
        }
        
        return null
    }

    /// 判断部门是否可以删除
    static async validate_dept_del(id) {
        // 查找以该部门为根节点的部门树
        let depts_tree = await CommonDao.depts_tree()
        let node = []
        function find_tree(t) {
            t.forEach(d => {
                if (d.id === id) { 
                    node = d
                    return false
                }
                if (d.children) { find_tree(d.children) }
            })
        }
        find_tree(depts_tree)
        // 1.判断是否存在子部门
        if (node.children) { throw new global.errs.iError("无法删除该部门(存在子部门)") }
        // 查找所有子部门
        let children = [id]
        function find_children(t) {
            t.forEach(d => {
                children.push(d.id)
                if (d.children) { find_children(d.children) }
            })
        }
        node.children && find_children(node.children)
        // 2.判断是否存在可用岗位
        let result = await Job.findOne({ where: { dept_id: {[Sequelize.Op.in]: children}, ...global.enums.where_notdel }})
        if (result) { throw new global.errs.iError("无法删除该部门(存在可用岗位)") }
        // 3.判断是否存在可用用户
        result = await User.findOne({ where: { dept_id: {[Sequelize.Op.in]: children}, ...global.enums.where_notdel }})
        if (result) { throw new global.errs.iError("无法删除该部门(存在可用用户)") }
    }
}

export default DeptDao