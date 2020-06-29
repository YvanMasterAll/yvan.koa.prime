import { Dept, User, Job } from '../models'
const Sequelize = require('sequelize')
const { doTransaction } = require('../utils/db')
import { CommonDao, DeptDao } from '../dao'
var _ = require('lodash')

class JobDao {

    /// 获取岗位列表
    static async job_list(where, ctx) {
        let result = await Job.findAndCountAll({
            where: { ...global.enums.where_notdel, ...where },
            order: ['sort'],
            offset: ctx.limit*ctx.pagenum,
            limit: ctx.limit
        })
        let count = result.count
        let results = result.rows.map(d => { return d.toJSON() })
        // 查找岗位所在的部门，并取到部门路径
        let depts = await CommonDao.depts()
        results.map(async r => {
            let dept_path = ''
            let dept = depts.filter(d => d.id === r.dept_id)[0]
            if (dept) {
                dept_path = dept.name
                while (dept && !(await DeptDao.isRootDept(null, dept))) {
                    dept = depts.filter(d => d.id === dept.pid)[0]
                    if (!(await DeptDao.isRootDept(null, dept))) { // 根目录就不添加到路径中了, 更美观
                        dept_path = dept.name + '/' + dept_path
                    }
                }
            }
            r.dept_path = dept_path
        })

        return {results, count}
    }

    /// 新增岗位
    static async job_add(name, dept, sort) {
        // 创建岗位
        let job = new Job()
        job.name = name
        job.dept_id = dept
        job.sort = sort
        await job.save()
    }

    /// 编辑岗位
    static async job_edit(id, name, dept, sort) {
        await Job.update({name, dept_id: dept, sort, update_at: new Date()}, {where: {id}})
    }

    /// 删除岗位
    static async job_del(id) {
        // 删除岗位
        await Job.update({ state: global.enums.state.del, update_at: new Date() }, { where: {id: id} })
    }

    /// 判断岗位存在
    static async job_exists(where) {
        let count = await Job.count({
            where: { ...where, ...global.enums.where }
        })
        return (count > 0)
    }

    /// 判断岗位是否可以删除
    static async validate_job_del(id) {
        // 判断是否存在可用用户
        let result = await User.findOne({ where: { job_id: id, ...global.enums.where_notdel }})
        if (result) { throw new global.errs.iError("无法删除该岗位(存在可用用户)") }
    }
}

export default JobDao