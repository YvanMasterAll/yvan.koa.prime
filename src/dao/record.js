const {Sequelize, Op} = require('sequelize')
import Student from '../models/student'
import Book from '../models/book'
import Record from '../models/record'

class RecordDao {

    /// 添加学生
    static async student_add(v) {
        let name = v.params.name
        if (!name) {
            throw new global.errs.ParamsIllegal()
        }

        let student = new Student()
        student.name = name

        await student.save()
    }

     /// 删除学生
     static async student_del(v) {
        let name = v.params.name
        if (!name) {
            throw new global.errs.ParamsIllegal()
        }

        let student = await Student.findOne({
            where: {
                name: name
            }
        })
        if (!student) {
            throw new global.errs.NotFound("没有找到该学生")
        }

        await student.destory()
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

    /// 学生借书
    static async book_borrow(v) {
        let stuid = v.params.stuid
        let bookid = v.params.bookid
        if (!stuid || !bookid) {
            throw new global.errs.ParamsIllegal()
        }
        let record = new Record()
        record.stuid = stuid
        record.bookid = bookid

        await record.save()
    }

    /// 借书记录
    static async record_list(v) {
        let records = await Record.findAll({
            include: [{
                model: Student,
                required: true,
            }, {
                model: Book,
                required: true,
            }],
            offset: v.page * v.limit,
            limit: v.limit,
            // raw: true
        })
        records = records.map ( record => {
            record.dataValues.test = "test"
            return record
        })

        return records

        // let records = await Student.findAll({
        //     include: [{
        //         model: Book,
        //         required: true
        //     }],
        //     offset: v.page * v.limit,
        //     limit: v.limit,
        //     raw: true
        // })

        // return records
    }
}

export default RecordDao