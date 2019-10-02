const jwt = require('jsonwebtoken')

const utils = {
    setpage: function(ctx) {            // 设置分页
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
    },
    getToken(payload = {}) {            // 生成token
        return jwt.sign(payload, global.config.app.secretkey, {
            expiresIn: global.config.app.expiresIn
        })
    },
    getJWTPayload(token) {              // 通过token获取json数据
        return jwt.verify(token.split(' ')[1], global.config.app.secretkey);
    },
}

export default utils