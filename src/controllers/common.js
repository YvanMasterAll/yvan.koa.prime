import CommonDao from '../dao/common'

/// 部门信息
export const depts = async (ctx, next) => {
    let depts = await CommonDao.depts()
    
    ctx.resolve.json.bind(ctx)(depts)
}