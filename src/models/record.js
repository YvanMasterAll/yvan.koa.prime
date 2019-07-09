const moment = require('moment');
const {sequelize} = require('../utils/db')
const {Sequelize, Model} = require('sequelize')
import Student from './student'
import Book from './book'

/// 借书记录

class Record extends Model { }

Record.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // 学生标识
    stuid: Sequelize.INTEGER,
    // 书籍标识
    bookid: Sequelize.INTEGER
}, {
    sequelize,
    tableName: 'record'
})

// https://itbilu.com/nodejs/npm/41qaV3czb.html //Sequelize 中文API文档－3. 模型（表）之间的关系/关联
// belongsTo: 一对一
// hasMany: 一对多
// belongsToMany: 多对多

Record.belongsTo(Student, {foreignKey: 'stuid', constraints: false})
Record.belongsTo(Book, {foreignKey: 'bookid', constraints: false})
// >>>
// "data": [
//     {
//         "id": 1,
//         "stuid": 1,
//         "bookid": 1,
//         "created_at": "2019-06-26T23:53:19.089Z",
//         "updated_at": "2019-06-26T23:53:19.089Z",
//         "Student": {
//             "id": 1,
//             "name": "vi",
//             "created_at": "2019-06-26T23:53:12.767Z",
//             "updated_at": "2019-06-26T23:53:12.767Z"
//         },
//         "Book": {
//             "id": 1,
//             "name": "葵花宝典",
//             "created_at": "2019-06-26T23:53:15.395Z",
//             "updated_at": "2019-06-26T23:53:15.395Z"
//         },
//         "test": "test"
//     }
// ]

// Book.belongsToMany(Student, {through: 'stu_book', foreignKey: 'bookid'})
// Student.belongsToMany(Book, {through: 'stu_book', foreignKey: 'stuid'})
// >>>
// {
//     "code": 200,
//     "msg": "操作成功",
//     "data": [
//         {
//             "id": 1,
//             "name": "vi",
//             "created_at": "2019-06-26T23:53:12.767Z",
//             "updated_at": "2019-06-26T23:53:12.767Z",
//             "Books.id": 1,
//             "Books.name": "葵花宝典",
//             "Books.created_at": "2019-06-26T23:53:15.395Z",
//             "Books.updated_at": "2019-06-26T23:53:15.395Z",
//             "Books.stu_book.created_at": "2019-06-26T23:53:46.000Z",
//             "Books.stu_book.updated_at": "2019-06-26T23:53:42.000Z",
//             "Books.stu_book.bookid": 1,
//             "Books.stu_book.stuid": 1
//         },
//         {
//             "id": 1,
//             "name": "vi",
//             "created_at": "2019-06-26T23:53:12.767Z",
//             "updated_at": "2019-06-26T23:53:12.767Z",
//             "Books.id": 2,
//             "Books.name": "1",
//             "Books.created_at": "2019-06-26T23:54:21.000Z",
//             "Books.updated_at": "2019-06-26T23:54:28.000Z",
//             "Books.stu_book.created_at": "2019-06-26T23:54:08.000Z",
//             "Books.stu_book.updated_at": "2019-06-26T23:54:31.000Z",
//             "Books.stu_book.bookid": 2,
//             "Books.stu_book.stuid": 1
//         }
//     ]
// }

export default Record