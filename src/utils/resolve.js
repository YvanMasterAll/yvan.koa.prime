const Resolve = {
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
}

export default Resolve
