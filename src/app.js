import Koa from 'koa'
const koaJwt = require('koa-jwt')
import KoaStatic from 'koa-static'
import onerror from 'koa-onerror'
import logger from 'koa-logger'
import json from 'koa-json'
import bodyparser from 'koa-bodyparser'
import path from 'path'
import config from './config'
import errorcatch from './middleware/errorcatch'
import errorroutes from './middleware/errorroutes'
import { _permissions } from './middleware/permissions'
import mainroutes from './routes/main'
import init from './utils/init'

const app = new Koa()
const env = process.env.NODE_ENV || 'development'
const server = require('http').Server(app.callback())

// initialize
init()

// error handler
onerror(app)

// global objects
const errors = require('./utils/errors')
global.errs = errors
global.config = config

// middlewares
app.use((ctx, next) => {
    if (ctx.request.header.host.split(':')[0] === 'localhost' || ctx.request.header.host.split(':')[0] === '127.0.0.1') {
        ctx.set('Access-Control-Allow-Origin', 'http://localhost:4444')
    } else {
        ctx.set('Access-Control-Allow-Origin', config.sys.http_server_host)
    }
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    ctx.set('Access-Control-Allow-Credentials', true) //允许带上cookie

    return next()
})
.use(bodyparser({
    enableTypes:['json', 'form', 'text']
}))
.use(json())
.use(logger())
.use(errorcatch())
.use(errorroutes())
.use(_permissions())
.use(KoaStatic('assets', path.resolve(__dirname, '../assets')))
.use(koaJwt({
    secret: global.config.app.secretkey
}).unless({
    path: [
        /^\/api\/auth\/signin/,
        /^\/api\/auth\/signup/,
        /^((?!\/api).)*$/ // 设置除了私有接口外的其它资源, 可以不需要认证访问
    ]
}))
.use(mainroutes.routes(), mainroutes.allowedMethods())

// logger
if (env === 'development') { 
    app.use((ctx, next) => {
        const start = new Date()
        return next().then(() => {
            const ms = new Date() - start
            console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
        })
    })
}

// error handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

// app.listen(config.sys.api_server_port)
// console.log('Now start API server on port ' + config.sys.api_server_port + '...')
server.listen(config.sys.api_server_port, () => {
    console.log(`app run at : http://localhost:${config.sys.api_server_port}`);
})

// // socket
// const io = require('socket.io')(server)
// io.on('connection', socket => {
//     console.log('初始化成功！下面可以用socket绑定事件和触发事件了');
//     socket.on('send', data => {
//          console.log('客户端发送的内容：', data);
//          socket.emit('getMsg', '我是返回的消息... ...');
//     })

//     setTimeout( () => {
//         socket.emit('getMsg', '我是初始化3s后的返回消息... ...') 
//     }, 3000)

//     socket.send('来自服务端的消息')

//     socket.on('message', data => {
//         console.log('客户端发送的内容：', data);
//     })
// })

export default app