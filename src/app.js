import Koa from 'koa'
import KoaStatic from 'koa-static'
import onerror from 'koa-onerror'
import logger from 'koa-logger'
import json from 'koa-json'
import bodyparser from 'koa-bodyparser'
import fs from 'fs'
import path from 'path'
import config from './config'
import errorcatch from './middleware/errorcatch'
import errorroutes from './middleware/errorroutes'
import mainroutes from './routes/main'
import { init } from './utils/base'

const app = new Koa()
const env = process.env.NODE_ENV || 'development'

const publicKey = fs.readFileSync(path.join(__dirname, '../publicKey.pub'))

//initialize
init()

//error handler
onerror(app)

//global objects
const errors = require('./utils/errors')
global.errs = errors
global.config = config

//middlewares
app.use((ctx, next) => {
    if (ctx.request.header.host.split(':')[0] === 'localhost' || ctx.request.header.host.split(':')[0] === '127.0.0.1') {
        ctx.set('Access-Control-Allow-Origin', '*')
    } else {
        ctx.set('Access-Control-Allow-Origin', config.sys.http_server_host)
    }
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
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
.use(KoaStatic('assets', path.resolve(__dirname, '../assets')))
.use(mainroutes.routes(), mainroutes.allowedMethods())
.use(errorroutes())

//logger
if (env === 'development') { 
    app.use((ctx, next) => {
        const start = new Date()
        return next().then(() => {
            const ms = new Date() - start
            console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
        })
    })
}

//error handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

app.listen(config.sys.api_server_port)

console.log('Now start API server on port ' + config.sys.api_server_port + '...')

export default app