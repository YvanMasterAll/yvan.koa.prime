import RedisDao from './redis'
import AuthDao from './auth'
import CommonDao from './common'
import RoleDao from './role'
import UserDao from './user'
import DeptDao from './dept'
import JobDao from './job'

/// 操作数据库时注意几个地方
/// 1.添加必要的条件global.enums.where或global.enums._where

export {
    RedisDao,
    AuthDao,
    CommonDao,
    UserDao,
    RoleDao,
    DeptDao,
    JobDao
}
