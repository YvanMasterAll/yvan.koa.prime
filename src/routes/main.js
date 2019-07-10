import KoaRouter from 'koa-router'
import controllers from '../controllers'
import { permissionCheck } from '../middleware/permissions'

const router = new KoaRouter()

const routes = [
    /// 借书模块
    {
        method: 'post',
        path: '/api/student/add/:name',
        perm: [102],
        control: controllers.record.student_add
    },
    {
        method: 'post',
        path: '/api/student/del/:name',
        perm: [],
        control: controllers.record.student_del
    },
    {
        method: 'post',
        path: '/api/book/add',
        perm: [],
        control: controllers.record.book_add
    },
    {
        method: 'post',
        path: '/api/book/del/:name',
        perm: [],
        control: controllers.record.book_del
    },
    {
        method: 'post',
        path: '/api/book/borrow/:stuid/:bookid',
        perm: [],
        control: controllers.record.book_borrow
    },
    {
        method: 'post',
        path: '/api/record/:page',
        perm: [],
        control: controllers.record.record_list
    }
]

routes.forEach(route => {
    if (route.method === 'post') {
        router.post(route.path, permissionCheck(route.perm), route.control)
    }
    if (route.method === 'get') {
        router.get(route.path, permissionCheck(route.perm), route.control)
    }
})

export default router
    // 测试模块
    .get('/public/api/:name', controllers.api.Get)
    .post('/api/:name', controllers.api.Post)
    .put('/api/:name', controllers.api.Put)
    .del('/api/:name', controllers.api.Delete)

    // 借书模块
    // .post('/api/student/add/:name', controllers.record.student_add)
    // .post('/api/student/del/:name', controllers.record.student_del)
    // .post('/api/book/add', controllers.record.book_add)
    // .post('/api/book/del/:name', controllers.record.book_del)
    // .post('/api/book/borrow/:stuid/:bookid', controllers.record.book_borrow)
    // .post('/api/record/:page', controllers.record.record_list)

    // 认证模块
    .post('/api/auth/signin', controllers.auth.signin)
    .post('/api/auth/signup', controllers.auth.signup)
    .get('/api/auth/check', controllers.auth.check)
