import { ST_Field, ST_Sheet_Tmpl, ST_Sheet } from '../../models'
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const { doTransaction } = require('../../utils/db')
import { WK_CommonDao, UserDao } from '../../dao'
import utils from '../../utils'
import moment from 'moment'

class SheetDao {

    /// 判断表格存在
    static async sheet_exists(where) {
        let count = await ST_Sheet.count({
            where: { ...global.enums.where, ...where }
        })
        return (count > 0)
    }

    /// 判断表格字段存在
    static async sheet_field_exists(where) {
        let count = await ST_Field.count({
            where: { ...global.enums.where, ...where }
        })
        return (count > 0)
    }

    /// 判断表格模板存在
    static async sheet_tmpl_exists(where) {
        let count = await ST_Sheet_Tmpl.count({
            where: { ...global.enums.where, ...where }
        })
        return (count > 0)
    }

    /// 添加表格
    static async sheet_add(data) {
        let sheet = new ST_Sheet()
        sheet.sn = data.sn
        sheet.sn2 = data.sn2
        sheet.title = data.title
        sheet.company = data.company
        sheet.date = data.date
        sheet.data = data.data
        sheet.tmpl_id = data.tmpl_id
        await sheet.save()
    }

    /// 添加表格模板
    static async sheet_tmpl_add(data) {
        let template = new ST_Sheet_Tmpl()
        template.title = data.title
        template.template = data.template
        await template.save()
    }

    /// 添加表格字段
    static async sheet_field_add(data) {
        let field = new ST_Field()
        field.key = data.key
        field.label = data.label
        field.value = data.value
        await field.save()
    }

    /// 编辑表格
    static async sheet_edit(data) {
        await ST_Sheet.update({...data, update_at: new Date()}, {where: {sn: data.sn}})
    }

    /// 编辑表格字段
    static async sheet_field_edit(data) {
        await ST_Field.update({...data, update_at: new Date()}, {where: {id: data.id}})
    }

    /// 构建查询条件
    static where_sheet(ctx) {
        let where = {}
        // 读取参数
        let sn = ctx.request.query.sn
        let company = ctx.request.query.company
        let date_start = ctx.request.query.date_start
        let date_end = ctx.request.query.date_end

        if (sn) { where[Op.or] = [{ sn: sn }, { sn2: sn }] }
        if (company) { where.company = { [Op.like]: company + '%' } }
        if (date_start && date_end) {
            where.date = {[Op.between]: [date_start, date_end]}
        } else if (date_start) {
            where.date = {[Op.gte]: date_start}
        } else if (date_end) {
            where.date = {[Op.lte]: date_end}
        }

        return where
    }

    /// 构建字段查询条件
    static where_sheet_field(ctx) {
        let where = {}
        // 读取参数
        let key = ctx.request.query.key
        let label = ctx.request.query.label
        let value = ctx.request.query.value

        if (key) { where.key = { [Op.like]: key + '%' } }
        if (label) { where.label = { [Op.like]: label + '%' } }
        if (value) { where.value = { [Op.like]: value + '%' } }

        return where
    }

    /// 构建模板查询条件
    static where_sheet_tmpl(ctx) {
        let where = {}
        // 读取参数
        let title = ctx.request.query.title

        if (title) { where.title = { [Op.like]: '%' + title + '%' } }

        return where
    }

    /// 删除表格
    static async sheet_del(id) {
        await ST_Sheet.update({ state: global.enums.state.del, update_at: new Date() }, { where: {id: id} })
    }

    /// 删除表格字段
    static async sheet_field_del(id) {
        await ST_Field.update({ state: global.enums.state.del, update_at: new Date() }, { where: {id: id} })
    }

    /// 删除表格模板
    static async sheet_tmpl_del(id) {
        await ST_Sheet_Tmpl.update({ state: global.enums.state.del, update_at: new Date() }, { where: {id: id} })
    }

    /// 获取表格列表
    static async sheet_list(where, ctx) {
        let result = await ST_Sheet.findAndCountAll({
            include: [{
                association: ST_Sheet.belongsTo(ST_Sheet_Tmpl, {foreignKey: 'tmpl_id', targetKey: 'id', constraints: false}),
            }], where: { ...global.enums.where_notdel, ...where },
            // order: [['id', 'DESC']],
            offset: ctx.limit*ctx.pagenum,
            limit: ctx.limit,
            distinct: true // 只计算主表数量
        })
        let count = result.count
        let results = result.rows.map(d => { return d.toJSON() })

        return {results, count}
    }

    /// 获取表格字段列表
    static async sheet_field_list(where, ctx) {
        let result = await ST_Field.findAndCountAll({
            where: { ...global.enums.where_notdel, ...where },
            // order: [['id', 'DESC']],
            offset: ctx.limit*ctx.pagenum,
            limit: ctx.limit,
            // distinct: true // 只计算主表数量
        })
        let count = result.count
        let results = result.rows.map(d => { return d.toJSON() })

        return {results, count}
    }

    /// 获取表格模板列表
    static async sheet_tmpl_list(where, ctx) {
        let result = await ST_Sheet_Tmpl.findAndCountAll({
            where: { ...global.enums.where_notdel, ...where },
            // order: [['id', 'DESC']],
            offset: ctx.limit*ctx.pagenum,
            limit: ctx.limit,
            // distinct: true // 只计算主表数量
        })
        let count = result.count
        let results = result.rows.map(d => { return d.toJSON() })

        return {results, count}
    }

    /// 获取表格字段
    static async sheet_fields() {
        let fields = await ST_Field.findAll({where: { ...global.enums.where }}).map(d => d.toJSON())
        return fields
    }

    /// 获取表格模板
    static async sheet_templates() {
        let templates = await ST_Sheet_Tmpl.findAll({where: { ...global.enums.where }}).map(d => d.toJSON())
        return templates
    }
}

export default SheetDao
