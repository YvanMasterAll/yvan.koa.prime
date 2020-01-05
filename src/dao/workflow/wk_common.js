import { WK_Process, WK_Transition, WK_State, WK_Field } from '../../models'

class WK_CommonDao {

    /// 获取流程信息
    static async processes(where) {
        return (await WK_Process.findAll({
            where: { ...global.enums.where, ...where }
        })).map(d => d.toJSON())
    }

    /// 获取流程列表
    /// 流程基本信息 + 新建状态的显示字段 + 新建状态的流转Action
    static async process_list(id) {
        if (!id) {
            return (await WK_Process.findAll({
                include: [{
                    association: WK_Process.hasOne(WK_State, {foreignKey: 'process_id', sourceKey: 'id', constraints: false}),
                    required: true,
                    include: [{
                        association: WK_State.hasMany(WK_Transition, {foreignKey: 'source_state', sourceKey: 'id', constraints: false}),
                        required: true,
                        where: { ...global.enums.where }
                    }],
                    where: { ...global.enums.where, type: global.enums.wk.state_type.start }
                }, {
                    association: WK_Process.hasMany(WK_Field, {foreignKey: 'process_id', sourceKey: 'id', constraints: false}),
                    required: true,
                    where: { ...global.enums.where },
                }], where: { ...global.enums.where }
            })).map(d => {
                return d.toJSON()
            })
        }
        let process = await WK_Process.findOne({
            include: [{
                association: WK_Process.hasOne(WK_State, {foreignKey: 'process_id', sourceKey: 'id', constraints: false}),
                required: true,
                include: [{
                    association: WK_State.hasMany(WK_Transition, {foreignKey: 'source_state', sourceKey: 'id', constraints: false}),
                    required: true,
                    where: { ...global.enums.where }
                }],
                where: { ...global.enums.where, type: global.enums.wk.state_type.start }
            }, {
                association: WK_Process.hasMany(WK_Field, {foreignKey: 'process_id', sourceKey: 'id', constraints: false}),
                required: true,
                where: { ...global.enums.where },
            }], where: { ...global.enums.where, id: id }
        })
        if (process) {
            return process.toJSON()
        }
        
        return null
    }

    /// 获取状态信息
    static async state(id) {
        let state = await WK_State.findOne({
            where: { ...global.enums.where, id: id },
            raw: true
        })

        return state
    }

    /// 获取流转
    static async transitions(where) {
        let transitions = (await WK_Transition.findAll({
            where: { ...global.enums.where, ...where }
        })).map(d => { return d.toJSON() })

        return transitions
    }

    /// 获取字段
    static async fields(where) {
        let fields = (await WK_Field.findAll({
            where: { ...global.enums.where, ...where },
            order: ['sort']
        })).map(d => { return d.toJSON() })

        return fields
    }
}

export default WK_CommonDao