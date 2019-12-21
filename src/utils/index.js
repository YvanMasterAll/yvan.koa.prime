const jwt = require('jsonwebtoken')
var _ = require('lodash')

const utils = {
    // 处理ctx响应数据
    resolve: {
        success: function (msg = '操作成功', code = 200) {
            this.body = {
                code,
                msg
            }
        },
        json: function (data, msg = '操作成功', total, code = 200) {
            this.body = {
                code,
                msg,
                data,
                total
            }
        },
        error: function (err) {
            this.body = {
                "code": err.code,
                "msg": err.msg
            }
        }
    },
    // 获取ctx数组参数
    getArrayParam: function(key) {      
        let arr = this.request.query[key + '[]']
        if (arr) {
            if (!(arr instanceof Array)) {
                return [arr]
            }
        }

        return arr
    },
    // 设置ctx分页
    setpage: function(ctx) {            
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
    // 生成token
    getToken(payload = {}) {            
        return jwt.sign(payload, global.config.app.secretkey, {
            expiresIn: global.config.app.expiresIn
        })
    },
    // 通过token取到json数据
    getJWTPayload(token) {              
        return jwt.verify(token.split(' ')[1], global.config.app.secretkey);
    },
    // 状态检查
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
String.prototype.startWith = function(str) {     
    var reg = new RegExp('^' + str)
    return reg.test(this)
}
String.prototype.toUrl = function() {  
    if (this.startWith('http')) { return this } 
    return global.config.sys.api_server_type + global.config.sys.api_server_host + ":" + global.config.sys.api_server_port + '/' + this
}

export default utils