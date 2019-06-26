import KoaRouter from 'koa-router'
import controllers from '../controllers'

const router = new KoaRouter()

export default router
    .get('/public/api/:name', controllers.api.Get)
    .post('/api/:name', controllers.api.Post)
    .put('/api/:name', controllers.api.Put)
    .del('/api/:name', controllers.api.Delete)
    .post('/api/user/add/:name', controllers.record.user_add)
    .post('/api/user/del/:name', controllers.record.user_del)
    .post('/api/book/add', controllers.record.book_add)
    .post('/api/book/del/:name', controllers.record.book_del)
    .post('/api/book/borrow/:userid/:bookid', controllers.record.book_borrow)
    .post('/api/record/:page', controllers.record.record_list)
