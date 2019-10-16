const jwt = require('jsonwebtoken')
var _ = require('lodash')

const utils = {
    getArrayParam: function(key) {      // 获取数组参数
        let arr = this.request.query[key + '[]']
        if (arr) {
            if (!(arr instanceof Array)) {
                return [arr]
            }
        }

        return arr
    },
    setpage: function(ctx) {            // 设置分页
        let pagenum = 0
        let limit = global.config.app.limit
        let total = 0
        // if (ctx.params && ctx.params.pagenum) {
        //     pagenum = ctx.params.pagenum
        // }
        // if (ctx.params && ctx.params.limit) {
        //     limit = ctx.params.limit
        // }
        if (ctx.request.query.pagenum) { pagenum = ctx.request.query.pagenum }
        if (ctx.request.query.limit) { limit = ctx.request.query.limit }
        if (ctx.request.query.total) { total = ctx.request.query.total }
        ctx.pagenum = pagenum
        ctx.limit = limit
        ctx.total = total
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
    }
}

/// 扩展
String.prototype.startWith = function(str){    
    var reg = new RegExp('^' + str)
    return reg.test(this)
} 

export default utils