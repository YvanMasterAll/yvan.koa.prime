import RecordDao from '../dao/record'

/// 添加用户
export const user_add = async (ctx, next) => {
    await RecordDao.user_add(ctx)

    ctx.resolve.success.bind(ctx)("成功添加用户")
}

/// 删除用户
export const user_del = async (ctx, next) => {
    await RecordDao.user_del(ctx)

    ctx.resolve.success.bind(ctx)("成功删除用户")
}

/// 添加书籍
export const book_add = async (ctx, next) => {
    await RecordDao.book_add(ctx)

    ctx.resolve.success.bind(ctx)("成功添加书籍")
}

/// 删除书籍
export const book_del = async (ctx, next) => {
    await RecordDao.book_del(ctx)

    ctx.resolve.success.bind(ctx)("成功删除书籍")
}

/// 用户借书
export const book_borrow = async (ctx, next) => {
    await RecordDao.book_borrow(ctx)

    ctx.resolve.success.bind(ctx)("成功借书")
}

/// 借书记录
export const record_list = async (ctx, next) => {
    let records = await RecordDao.record_list(ctx)

    ctx.resolve.json.bind(ctx)(records)
}

