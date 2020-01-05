/// DF: 登录获取用户角色时是否需要判断角色状态
// /// 获取用户角色
// static async roles(id) {
//     return (await Users_Roles.findAll({
//         include: [{
//             model: Role,
//             required: true,
//             where: { ...global.enums.where }
//         }], where: {
//             user_id: id,
//             ...global.enums.where
//         }
//     })).map(d => {
//         return d.toJSON()
//     }).map(d => d.Role)
// }


// return (await Users_Roles.findAll({
//     include: [{
//         model: Role,
//         required: true,
//         where: { ...global.enums.where }
//     }], where: {
//         user_id: id,
//         ...global.enums.where
//     }
// })).map(d => {
//     return d.toJSON()
// }).map(d => d.Role)


/// 合并关联数据, 重组具有父子关系的数据, 像部门数据, 权限数据
// static mergeRelateData(data) {
//     let _data = []
//     data.forEach(r => {
//         let group = []
//         let current = r
//         // 获取数据组
//         group.push(current)
//         while (current && current.pid !== 0) { 
//             current = data.filter(r => r.id === current.pid)[0]
//             if (current) { group.push(current) }
//         }
//         // 构建数据链
//         let node = _data // 操作节点
//         for (let i = group.length - 1; i >= 0; i --) {
//             let d = group[i] // 要加入的节点
//             let _d = node.filter(r => r.id === d.id)[0]
//             if (!_d) { node.push(d) } // 如果节点不存在则加入
//             if (i !== 0) { // 避免添加空的children, 因为children属性可以用来判断有没有子节点
//                 if (!d.children) { d.children = [] }
//                 node = d.children // 更换操作节点
//             }
//         }
//     })
    
//     return _data
// }

/// DF: 模拟工单数据
// this.state = {
//     process_id: 1,
//     fields: {
//         "title": 1,
//         "leave_start": 1,
//         "leave_end": 1,
//         "leave_type": 1,
//         "leave_reason": 1,
//         "leave_days": 1,
//         "image": 1,
//         "attachment": 1,
//         'int': 1,
//         'radio': 1,
//         'checkbox': 1,
//         'richtext': 1
//     }
// }
// this.json_data = {
//     title: "认真填写请假单",
//     leave_start: "2019-12-27 17:26:55",
//     leave_end: "2019-12-28 17:26:55",
//     leave_type: "病假",
//     leave_days: '1.5',
//     leave_reason: "认真填写请假单",
//     int: '10',
//     float: '1.50',
//     radio: '选项一',
//     checkbox: ['选项一', '选项二'],
//     richtext: '这是富文本',
//     image: [{name: 'foo.jpeg', url: 'http://localhost:3001/ticket/upload/upload-16f55bc7f1e.png'}, {name: 'foo2.jpeg', url: 'http://localhost:3001/ticket/upload/upload-16f55c59612.png'}],
//     attachment: [{name: 'foo.jpeg', url: 'http://localhost:3001/ticket/upload/upload-16f55bc7f1e.png'}, {name: 'foo2.jpeg', url: 'http://localhost:3001/ticket/upload/upload-16f55c59612.png'}],
// }
// let _fields = [
// {
//     "id": 0,
//     "name": "请假标题",
//     "key": "title",
//     "description": "请假标题",
//     "process_id": 1,
//     "creator": 1,
//     "sort": 0,
//     "type": "string",
//     "choice": null,
//     "state": "on",
//     "created_at": "2019-12-27T07:15:58.000Z",
//     "updated_at": "2019-12-27T07:16:03.000Z"
// },
// {
//     "id": 1,
//     "name": "开始时间",
//     "key": "leave_start",
//     "description": "请假开始时间",
//     "process_id": 1,
//     "creator": 1,
//     "sort": 5,
//     "type": "date",
//     "choice": null,
//     "state": "on",
//     "created_at": "2019-12-27T07:07:07.632Z",
//     "updated_at": "2019-12-27T07:07:07.632Z"
// },
// {
//     "id": 2,
//     "name": "结束时间",
//     "key": "leave_end",
//     "description": "请假结束时间",
//     "process_id": 1,
//     "creator": 1,
//     "sort": 10,
//     "type": "date",
//     "choice": null,
//     "state": "on",
//     "created_at": "2019-12-27T07:07:07.632Z",
//     "updated_at": "2019-12-27T07:07:07.632Z"
// },
// {
//     "id": 3,
//     "name": "请假天数(0.5的倍数)",
//     "key": "leave_days",
//     "description": "根据起止时间自动计算",
//     "process_id": 1,
//     "creator": 1,
//     "sort": 15,
//     "type": "float",
//     "choice": null,
//     "state": "on",
//     "created_at": "2019-12-27T07:07:07.632Z",
//     "updated_at": "2019-12-27T07:07:07.632Z"
// },
// {
//     "id": 4,
//     "name": "请假类型",
//     "key": "leave_type",
//     "description": "请假类型",
//     "process_id": 1,
//     "creator": 1,
//     "sort": 20,
//     "type": "select",
//     "choice": {
//         "1": "年假",
//         "2": "调休",
//         "3": "病假",
//         "4": "婚假"
//     },
//     "state": "on",
//     "created_at": "2019-12-27T07:07:07.633Z",
//     "updated_at": "2019-12-27T07:07:07.633Z"
// },
// {
//     "id": 5,
//     "name": "请假原因",
//     "key": "leave_reason",
//     "description": "病假请提供证明拍照附件， 婚假请提供结婚证拍照附件",
//     "process_id": 1,
//     "creator": 1,
//     "sort": 25,
//     "type": "text",
//     "choice": null,
//     "state": "on",
//     "created_at": "2019-12-27T07:07:07.633Z",
//     "updated_at": "2019-12-27T07:07:07.633Z"
// },
// {
//     "id": 6,
//     "name": "int类型",
//     "key": "int",
//     "description": "",
//     "process_id": 1,
//     "creator": 1,
//     "sort": 30,
//     "type": "int",
//     "choice": null,
//     "state": "on",
//     "created_at": "2019-12-27T07:07:07.633Z",
//     "updated_at": "2019-12-27T07:07:07.633Z"
// },
// {
//     "id": 7,
//     "name": "radio类型",
//     "key": "radio",
//     "description": "",
//     "process_id": 1,
//     "creator": 1,
//     "sort": 35,
//     "type": "radio",
//     "choice": {
//         "1": "选项一",
//         "2": "选项二",
//         "3": "选项三",
//         "4": "选项四"
//     },
//     "state": "on",
//     "created_at": "2019-12-27T07:07:07.633Z",
//     "updated_at": "2019-12-27T07:07:07.633Z"
// },
// {
//     "id": 8,
//     "name": "checkbox类型",
//     "key": "checkbox",
//     "description": "",
//     "process_id": 1,
//     "creator": 1,
//     "sort": 40,
//     "type": "checkbox",
//     "choice": {
//         "2": "选项一",
//         "3": "选项二",
//         "4": "选项三",
//         "5": "选项四"
//     },
//     "state": "on",
//     "created_at": "2019-12-27T07:07:07.633Z",
//     "updated_at": "2019-12-27T07:07:07.633Z"
// },
// {
//     "id": 9,
//     "name": "富文本",
//     "key": "richtext",
//     "description": "",
//     "process_id": 1,
//     "creator": 1,
//     "sort": 45,
//     "type": "richtext",
//     "choice": null,
//     "state": "on",
//     "created_at": "2019-12-27T07:07:07.633Z",
//     "updated_at": "2019-12-27T07:07:07.633Z"
// },
// {
//     "id": 10,
//     "name": "图片上传",
//     "key": "image",
//     "description": "图片大小不能超过500KB",
//     "process_id": 1,
//     "creator": 1,
//     "sort": 50,
//     "type": "image",
//     "choice": null,
//     "state": "on",
//     "created_at": "2019-12-27T07:07:07.633Z",
//     "updated_at": "2019-12-27T07:07:07.633Z"
// },
// {
//     "id": 11,
//     "name": "文件上传",
//     "key": "attachment",
//     "description": "文件大小不能超过500KB",
//     "process_id": 1,
//     "creator": 1,
//     "sort": 55,
//     "type": "attachment",
//     "choice": null,
//     "state": "on",
//     "created_at": "2019-12-27T07:07:07.633Z",
//     "updated_at": "2019-12-27T07:07:07.633Z"
// }]
// // 初始化表单字段
// let fields = []
// _fields.forEach(f => {
//     if (this.state.fields[f.key] !== null) { // 过滤字段，只显示有效字段
//         if (f.type === this.$enums.wk.field_type.checkbox) { // 如果是多选框需要初始化，不然会报错
//             // this.form[f.key] = []
//             this.$set(this.form, f.key, []) // 这里需要调用Vue的set方法来实现数据更新，避免多选框出现无法选中的问题
//         }
//         f.attribute = this.state.fields[f.key] // 字段属性
//         // 表单数据初始化，对于已有的数据，需要合并到字段中并显示到表单上
//         if (this.json_data[f.key] !== null) {
//             f.value = this.json_data[f.key]
//             if (f.type === this.$enums.wk.field_type.image || 
//                 f.type === this.$enums.wk.field_type.attachment) {
//                 this.$set(this.form, `_${f.key}`, f.value)
//             } else {
//                 this.$set(this.form, f.key, f.value)
//             }
//         }
//         fields.push(f)
//     }
// })
// this.fields = fields
// // 流转Action
// let transitions = [
// {
//     "id": 1,
//     "name": "提交",
//     "process_id": 1,
//     "creator": 1,
//     "source_state": 1,
//     "target_state": 3,
//     "type": "normal",
//     "action_type": "accept",
//     "state": "on",
//     "created_at": "2019-12-27T07:07:07.635Z",
//     "updated_at": "2019-12-27T07:07:07.635Z"
// },
// {
//     "id": 2,
//     "name": "保存",
//     "process_id": 1,
//     "creator": 1,
//     "source_state": 1,
//     "target_state": 2,
//     "type": "normal",
//     "action_type": "accept",
//     "state": "on",
//     "created_at": "2019-12-27T07:07:07.635Z",
//     "updated_at": "2019-12-27T07:07:07.635Z"
// }]