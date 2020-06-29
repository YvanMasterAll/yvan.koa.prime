import utils from '../../utils'
const Sequelize = require('sequelize')
import { SheetDao } from '../../dao'
var _ = require('lodash')

/// 获取表格列表
export const list = async (ctx, next) => {
    // 构建查询条件
    let where = SheetDao.where_sheet(ctx)
    // 查询数据
    let {results, count} = await SheetDao.sheet_list(where, ctx)

    ctx.resolve.json.bind(ctx)(results, '操作成功', count)
}

/// 新增表格
export const add = async (ctx, next) => {
    // 读取参数
    let sn = ctx.request.query.sn
    let sn2 = ctx.request.query.sn2
    let title = ctx.request.query.title
    let date = ctx.request.query.date
    let company = ctx.request.query.company
    let data = ctx.request.query.data
    let tmpl_id = ctx.request.query.tmpl_id*1
    // 参数验证
    if (!sn || !data || !title || !tmpl_id) { throw new global.errs.ParamsIllegal() }
    // 判断重名
    if (await SheetDao.sheet_exists({sn, title})) {
        throw new global.errs.NotFound("设备编号已被占用")
    }
    // 验证模板
    if (!(await SheetDao.sheet_tmpl_exists({id: tmpl_id}))) {
        throw new global.errs.NotFound("表格模板不存在")
    }
    
    await SheetDao.sheet_add({sn, sn2, title, date, company, tmpl_id, data})

    ctx.resolve.success.bind(ctx)("成功添加表格")
}

/// 编辑表格
export const edit = async (ctx, next) => {
    // 读取参数
    let sn = ctx.request.query.sn
    let sn2 = ctx.request.query.sn2
    let title = ctx.request.query.title
    let date = ctx.request.query.date
    let company = ctx.request.query.company
    let data = ctx.request.query.data
    // 参数验证
    if (!sn || !data || !title) { throw new global.errs.ParamsIllegal() }
    // 验证表格
    if (!(await SheetDao.sheet_exists({sn, title}))) {
        throw new global.errs.NotFound("编辑的表格不存在")
    }
    
    await SheetDao.sheet_edit({sn, sn2, title, date, company, data})

    ctx.resolve.success.bind(ctx)("成功编辑表格")
}

/// 删除表格
export const del = async (ctx, next) => {
    // 读取参数
    let id = ctx.request.query.id*1
    // 参数验证
    if (!id) { throw new global.errs.ParamsIllegal() }
    // 验证表格
    if (!(await SheetDao.sheet_exists({id}))) {
        throw new global.errs.NotFound("要删除的表格不存在")
    }
    
    await SheetDao.sheet_del(id)

    ctx.resolve.success.bind(ctx)("表格删除成功")
}

/// 上传文件
export const sheet_upload = async (ctx, next) => {
    let upload = ctx.req.file
    if (!upload) { throw new global.errs.UploadFailed() } 
    let path = upload.path.replace('assets/', '')
    
    ctx.resolve.json.bind(ctx)(path.toUrl(), "上传文件成功")
}

/// 字段数据
export const sheet_fields = async (ctx, next) => {
    let fields = await SheetDao.sheet_fields()
    
    ctx.resolve.json.bind(ctx)(fields)
}

/// 模板数据
export const sheet_templates = async (ctx, next) => {
    let templates = await SheetDao.sheet_templates()
    
    ctx.resolve.json.bind(ctx)(templates)
}

/// 获取表格字段列表
export const field_list = async (ctx, next) => {
    // 构建查询条件
    let where = SheetDao.where_sheet_field(ctx)
    // 查询数据
    let {results, count} = await SheetDao.sheet_field_list(where, ctx)

    ctx.resolve.json.bind(ctx)(results, '操作成功', count)
}

/// 新增表格字段
export const field_add = async (ctx, next) => {
    // 读取参数
    let key = ctx.request.query.key
    let label = ctx.request.query.label
    let value = ctx.request.query.value
    // 参数验证
    if (!key || !label || !value) { throw new global.errs.ParamsIllegal() }
    
    await SheetDao.sheet_field_add({key, label, value})

    ctx.resolve.success.bind(ctx)("成功添加表格字段")
}

/// 编辑表格
export const field_edit = async (ctx, next) => {
    // 读取参数
    let id = ctx.request.query.id*1
    let key = ctx.request.query.key
    let label = ctx.request.query.label
    let value = ctx.request.query.value
    // 参数验证
    if (!id) { throw new global.errs.ParamsIllegal() }
    // 验证表格字段
    if (!(await SheetDao.sheet_field_exists({id}))) {
        throw new global.errs.NotFound("编辑的表格字段不存在")
    }
    
    await SheetDao.sheet_field_edit({id, key, label, value})

    ctx.resolve.success.bind(ctx)("成功编辑表格字段")
}

/// 删除表格字段
export const field_del = async (ctx, next) => {
    // 读取参数
    let id = ctx.request.query.id*1
    // 参数验证
    if (!id) { throw new global.errs.ParamsIllegal() }
    // 验证表格字段
    if (!(await SheetDao.sheet_field_exists({id}))) {
        throw new global.errs.NotFound("要删除的表格字段不存在")
    }
    
    await SheetDao.sheet_field_del(id)

    ctx.resolve.success.bind(ctx)("表格字段删除成功")
}

/// 获取模板列表
export const tmpl_list = async (ctx, next) => {
    // 构建查询条件
    let where = SheetDao.where_sheet_tmpl(ctx)
    // 查询数据
    let {results, count} = await SheetDao.sheet_tmpl_list(where, ctx)

    ctx.resolve.json.bind(ctx)(results, '操作成功', count)
}

/// 新增表格模板
export const tmpl_add = async (ctx, next) => {
    // 读取参数
    let title = ctx.request.query.title
    let template = ctx.request.query.template
    // 参数验证
    if (!title || !template) { throw new global.errs.ParamsIllegal() }
    // 验证表格模板
    if (await SheetDao.sheet_tmpl_exists({title})) {
        throw new global.errs.NotFound("已存在同名模板")
    }
    
    await SheetDao.sheet_tmpl_add({title, template})

    ctx.resolve.success.bind(ctx)("成功添加表格模板")
}

/// 删除表格模板
export const tmpl_del = async (ctx, next) => {
    // 读取参数
    let id = ctx.request.query.id*1
    // 参数验证
    if (!id) { throw new global.errs.ParamsIllegal() }
    // 验证表格模板
    if (!(await SheetDao.sheet_tmpl_exists({id}))) {
        throw new global.errs.NotFound("要删除的表格模板不存在")
    }
    
    await SheetDao.sheet_tmpl_del(id)

    ctx.resolve.success.bind(ctx)("表格模板删除成功")
}