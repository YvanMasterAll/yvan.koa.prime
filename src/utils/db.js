const Sequelize = require('sequelize')
import config from '../config'

const sequelize = new Sequelize(
    config.db.database,
    config.db.username,
    config.db.password, {
        'logging': true,
        'dialect': 'postgres',                 
        'host': config.db.host, 
        'port': config.db.port, 
        'timezone': '+08:00',
        'timestamp': true, //自动给每条数据添加createdAt和updateAt字段
        'quoteIdentifiers': true,
        'define': {
            'charset': 'utf8',
            'createdAt': 'created_at',
            'updatedAt': 'updated_at',
            'underscored': true, //把驼峰命名转换为下划线
        }
    }
)

sequelize.sync({ force: false }) //自动创建表

async function doTransaction(exec, error) {
    // 开始事务
    let transaction
    try {
        transaction = await sequelize.transaction()
        await exec(transaction)

        await transaction.commit()
    } catch (err) {
        console.log(err)
        await transaction.rollback()
        if (error) { error() }
    }
}

export {
    sequelize,
    doTransaction
}