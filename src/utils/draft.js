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