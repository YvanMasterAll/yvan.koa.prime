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