import { WK_CommonDao } from '../../dao'

/// 流程信息
/// 流程基本信息 + 新建状态的显示字段 + 新建状态的流转Action
export const processes = async (ctx, next) => {
    let processes = await WK_CommonDao.process_info()
    
    ctx.resolve.json.bind(ctx)(processes)
}
