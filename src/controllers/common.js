import { CommonDao } from '../dao'

/// 部门信息
export const depts = async (ctx, next) => {
    let depts = await CommonDao.depts_tree()
    
    ctx.resolve.json.bind(ctx)(depts)
}

/// 岗位信息
export const jobs = async (ctx, next) => {
    let jobs = await CommonDao.jobs()

    ctx.resolve.json.bind(ctx)(jobs)
}

/// 角色信息
export const roles = async (ctx, next) => {
    let roles = await CommonDao.roles()

    ctx.resolve.json.bind(ctx)(roles)
}

/// 权限信息
export const permissions = async (ctx, next) => {
    let permissions = await CommonDao.permissions_tree()

    ctx.resolve.json.bind(ctx)(permissions)
}

/// 菜单信息
export const menus = async (ctx, next) => {
    let menus = await CommonDao.menus_tree()

    ctx.resolve.json.bind(ctx)(menus)
}
