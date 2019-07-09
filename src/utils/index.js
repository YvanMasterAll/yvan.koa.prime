const jwt = require('jsonwebtoken')

/// 全局函数

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

/// 生成token
function getToken(payload = {}) {
    return jwt.sign(payload, global.config.app.secretkey, {
        expiresIn: global.config.app.expiresIn
    })
}

/// 通过token获取jwt的payload部分
function getJWTPayload(token) {
    return jwt.verify(token.split(' ')[1], global.config.app.secretkey);
}

module.exports = {
    setpage,
    getToken,
    getJWTPayload
}