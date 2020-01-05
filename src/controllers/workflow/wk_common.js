import { WK_CommonDao } from '../../dao'

/// 流程列表
/// 流程基本信息 + 新建状态的显示字段 + 新建状态的流转Action
export const process_list = async (ctx, next) => {
    let processes = await WK_CommonDao.process_list()
    
    ctx.resolve.json.bind(ctx)(processes)
}

/// 获取流程信息
export const processes = async (ctx, next) => {
    let processes = await WK_CommonDao.processes()
    
    ctx.resolve.json.bind(ctx)(processes)
}
