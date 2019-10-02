import path from 'path'
import fs from 'fs'

/// 项目配置

const publicKey = fs.readFileSync(path.join(__dirname, '../publicKey.pub'))

const config = {
    sys: {
        api_server_type: 'http://',     //API服务器协议类型,包含"http://"或"https://"
        api_server_host: 'localhost',   //API服务器暴露的域名地址,请勿添加"http://"
        api_server_port: '3001',        //API服务器监听的端口号
        http_server_type: 'http://',    //HTTP服务器协议类型,包含"http://"或"https://"
        http_server_host: 'www.XXX.com',//HTTP服务器地址,请勿添加"http://" （即前端调用使用的服务器地址，如果是APP请设置为 * ）
        http_server_port: '65534',      //HTTP服务器端口号
        system_country: 'zh-cn',        //所在国家的国家代码
        system_plugin_path: path.join(__dirname, './plugins'), //插件路径
        session_key: 'RESTfulAPI',      //生产环境务必随机设置一个值
        db_type: 'postgres'             //数据库类型
    },
    db: {
        host: 'localhost',              //服务器地址
        port: 5432,                     //数据库端口号
        username: 'zzcloud',            //数据库用户名
        password: 'zzcloud',            //数据库密码
        database: 'zzcloud2',           //数据库名称
        prefix: '',                     //表前缀, 如"api_"
        avatar: 'https://source.unsplash.com/zBmcEepz5FQ/256x256' //默认头像
    },
    app: {
        limit: 10,                      //分页大小
        secretkey: publicKey,           //jwt盐
        expiresIn: '2h',                //token时效'
    }
}

// global objects
global.config = config
const errors = require('./utils/errors')
global.errs = errors

export default config
