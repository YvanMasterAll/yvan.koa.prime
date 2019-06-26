import models from '../models/index'

/// 全局函数

/// 初始化工作
function init() {
    
}

/// 分页数据
function setpage(ctx) {
    let page = 0
    let limit = global.config.app.limit
    if (ctx.params && ctx.params.page) {
        page = ctx.params.page
    }
    if (ctx.params && ctx.params.limit) {
        limit = ctx.params.limit
    }
    ctx.page = page
    ctx.limit = limit
}

module.exports = {
    setpage,
    init
}