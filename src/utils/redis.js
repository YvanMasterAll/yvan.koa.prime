const Redis = require('ioredis')
let client = new Redis(global.config.redis)

const redisUtil = {
    async get(key) {
        return await client.get(key)
    },

    async set(key, value, maxAge = 7*24*60*60*1000) {
        try {
            await client.set(key, value, 'EX', maxAge/1000)
        } catch (e) {
            console.log('redis存储异常: ' + e)
            return false
        }

        return true
    },

    async get_json(key) {
        let data = await client.get(key)

        return JSON.parse(data)
    },

    async set_json(key, data, maxAge = 7*24*60*60*1000) {
        try {
            // Use redis set EX to automatically drop expired sessions
            await client.set(key, JSON.stringify(data), 'EX', maxAge/1000)
        } catch (e) {
            console.log('redis存储异常: ' + e)
            return false
        }

        return true
    },

    async hget_json(key, field) {
        let data = await client.hget(key, field)

        return JSON.parse(data)
    },

    async hset_json(key, field, data) {
        try {
            // Use redis set EX to automatically drop expired sessions
            await client.hset(key, field, JSON.stringify(data))
        } catch (e) {
            console.log('redis存储异常: ' + e)
            return false
        }

        return true
    },

    async del(key) {
        return await client.del(key)
    },

    async hdel(key) { // 这种删除方式可能在性能上会有很大影响, 最好使用多个键值对来实现以避免性能消耗
        return await client.hdel(key, await client.hkeys(key))
    }
}

export default redisUtil
