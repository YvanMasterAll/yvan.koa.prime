import { Roles_Depts } from '../models'
const Sequelize = require('sequelize')

class UserDao {

    /// 获取部门权限
    static async depts(roleids) {
        return (await Roles_Depts.findAll({
            where: {
                role_id: {
                    [Sequelize.Op.in]: roleids
                },
                ...global.enums.where
            }
        })).map(d => {
            return d.toJSON()
        })
    }
}

export default UserDao