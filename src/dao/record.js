const {Sequelize, Op} = require('sequelize')
import User from '../models/user'
import Book from '../models/book'
import Record from '../models/record'

class RecordDao {

    /// 添加用户
    static async user_add(v) {
        let name = v.params.name
        if (!name) {
            throw new global.errs.ParamsIllegal()
        }

        let user = new User()
        user.name = name

        await user.save()
    }

     /// 删除用户
     static async user_del(v) {
        let name = v.params.name
        if (!name) {
            throw new global.errs.ParamsIllegal()
        }

        let user = await User.findOne({
            where: {
                name: name
            }
        })
        if (!user) {
            throw new global.errs.NotFound("没有找到该用户")
        }

        await user.destory()
    }

    /// 添加书籍
    static async book_add(v) {
        let name = v.request.query.name
        if (!name) {
            throw new global.errs.ParamsIllegal()
        }

        let book = new Book()
        book.name = name

        await book.save()
    }

     /// 删除书籍
     static async book_del(v) {
        let name = v.params.name
        if (!name) {
            throw new global.errs.ParamsIllegal()
        }

        let book = await Book.findOne({
            where: {
                name: name
            }
        })
        if (!book) {
            throw new global.errs.NotFound("没有找到该书籍")
        }

        await book.destory()
    }

    /// 用户借书
    static async book_borrow(v) {
        let userid = v.params.userid
        let bookid = v.params.bookid
        if (!userid || !bookid) {
            throw new global.errs.ParamsIllegal()
        }
        let record = new Record()
        record.userid = userid
        record.bookid = bookid

        await record.save()
    }

    /// 借书记录
    static async record_list(v) {
        let records = await Record.findAll({
            include: [{
                model: User,
                required: true
            }, {
                model: Book,
                required: true
            }],
            offset: v.page * v.limit,
            limit: v.limit,
            raw: true
        })
        records = records.map ( record => {
            record.test = "test"
            return record
        })

        return records
    }
}

export default RecordDao