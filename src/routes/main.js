import KoaRouter from 'koa-router'
import controllers from '../controllers'
import { permissionCheck } from '../middleware/permissions'

const router = new KoaRouter()

let meta = { auth: false }

const routes = [
    /// 借书模块
    {
        method: 'post',
        path: '/api/student/add/:name',
        meta: { ...meta, perm: [] },
        control: controllers.record.student_add
    },
    {
        method: 'post',
        path: '/api/student/del/:name',
        meta: { ...meta, perm: [] },
        control: controllers.record.student_del
    },
    {
        method: 'post',
        path: '/api/book/add',
        meta: { ...meta, perm: [] },
        control: controllers.record.book_add
    },
    {
        method: 'post',
        path: '/api/book/del/:name',
        meta: { ...meta, perm: [] },
        control: controllers.record.book_del
    },
    {
        method: 'post',
        path: '/api/book/borrow/:stuid/:bookid',
        meta: { ...meta, perm: [] },
        control: controllers.record.book_borrow
    },
    {
        method: 'post',
        path: '/api/record/:page',
        meta: { ...meta, perm: [] },
        control: controllers.record.record_list
    },
    /// 通用模块
    {
        method: 'get',
        path: '/api/common/depts',
        meta: { ...meta },
        control: controllers.common.depts
    },
    /// 用户模块
    {
        method: 'get',
        path: '/api/user/list',
        meta: { ...meta },
        control: controllers.user.list
    },
    {
        method: 'post',
        path: '/api/user/add',
        meta: { ...meta },
        control: controllers.user.add
    },
]

routes.forEach(route => {
    if (route.method === 'post') {
        router.post(route.path, permissionCheck(route), route.control)
    }
    if (route.method === 'get') {
        router.get(route.path, permissionCheck(route), route.control)
    }
})

export default router
    // 借书模块
    // .post('/api/student/add/:name', controllers.record.student_add)
    // .post('/api/student/del/:name', controllers.record.student_del)
    // .post('/api/book/add', controllers.record.book_add)
    // .post('/api/book/del/:name', controllers.record.book_del)
    // .post('/api/book/borrow/:stuid/:bookid', controllers.record.book_borrow)
    // .post('/api/record/:page', controllers.record.record_list)

    // 认证模块
    .post('/api/auth/signin', controllers.auth.signin)
    .get('/api/auth/check', controllers.auth.check)
