const jwt = require('jsonwebtoken')
var _ = require('lodash')

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
    stateValid(state, value) {
        let flag = false
        _.forEach(state, function(v, key) {
            if (value === v) {
                flag = true
                return false
            }
        })

        return flag
    },
}

/// 扩展
String.prototype.startWith = function(str){    
    var reg = new RegExp('^' + str)
    return reg.test(this)
} 

export default utils