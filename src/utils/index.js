const jwt = require('jsonwebtoken')
var moment = require('moment')
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

/// 验证工单字段输入的合法性，返回有效输入
/// ctx：请求内容，wk_fields：流程字段，流程内所有的字段，fields：状态字段，表示某个状态下显示和操作的字段
utils.validate_wk_fields = function (ctx, wk_fields, fields) {
    function validate_value (wk_field, value) { // 值验证
        if (wk_field.type === global.enums.wk.field_type.int) {
            return !isNaN(value*1)
        } 
        if (wk_field.type === global.enums.wk.field_type.float) {
            return !isNaN(value*1)
        } 
        if (wk_field.type === global.enums.wk.field_type.date) {
            return utils.isDateString(value)
        } 
        if (wk_field.type === global.enums.wk.field_type.select) {
            let selects = wk_field.choice
            return Object.values(selects).includes(value)
        }
        // TODO: 需要补充更多的验证
        return true
    }
    let result = {}
    for (var key in fields) {
        let attribute = fields[key] // 读写属性
        let wk_field = wk_fields.filter(f => f.key === key)[0]
        if (attribute === global.enums.wk.field_attribute_type.optional) { // 可选属性
            let value = ctx.request.query[key]
            if (value && validate_value(wk_field, value)) {
                result[key] = value // 添加到结果集
            }
        }
        if (attribute === global.enums.wk.field_attribute_type.required) { // 必填属性
            let value = ctx.request.query[key]
            if (value && validate_value(wk_field, value)) {
                result[key] = value // 添加到结果集
            } else {
                throw new global.errs.ParamsIllegal() // 输入不合法抛出异常
            }
        }
    }

    return result
}

utils.toDateString = function(date) {
    let format = "YYYY-MM-DD HH:mm:ss"
    if (date) {
        return moment(date).format(format)
    }
    return moment().format(format)
}
utils.toDate = function(dateString) {
    let format = "YYYY-MM-DD HH:mm:ss"

    return moment(dateString, format)
}
utils.isDateString = function(dateString) {
    return /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/.test(dateString)
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