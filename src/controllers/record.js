import { RecordDao } from '../dao'

/// 添加学生
export const student_add = async (ctx, next) => {
    await RecordDao.student_add(ctx)

    ctx.resolve.success.bind(ctx)("成功添加学生")
}

/// 删除学生
export const student_del = async (ctx, next) => {
    await RecordDao.student_del(ctx)

    ctx.resolve.success.bind(ctx)("成功删除学生")
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

/// 学生借书
export const book_borrow = async (ctx, next) => {
    await RecordDao.book_borrow(ctx)

    ctx.resolve.success.bind(ctx)("成功借书")
}

/// 借书记录
export const record_list = async (ctx, next) => {
    let records = await RecordDao.record_list(ctx)

    ctx.resolve.json.bind(ctx)(records)
}

