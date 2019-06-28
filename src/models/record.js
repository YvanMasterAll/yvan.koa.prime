const moment = require('moment');
const {sequelize} = require('../utils/db')
const {Sequelize, Model} = require('sequelize')
import User from './user'
import Book from './book'

/// 借书记录

class Record extends Model { }

Record.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    //用户标识
    userid: Sequelize.INTEGER,
    //书籍标识
    bookid: Sequelize.INTEGER
}, {
    sequelize,
    tableName: 'record'
})

Record.belongsTo(User, {foreignKey: 'userid', constraints: false})
Record.belongsTo(Book, {foreignKey: 'bookid', constraints: false})
// >>>
// "data": [
//     {
//         "id": 1,
//         "userid": 1,
//         "bookid": 1,
//         "created_at": "2019-06-26T23:53:19.089Z",
//         "updated_at": "2019-06-26T23:53:19.089Z",
//         "User": {
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

// Book.belongsToMany(User, {through: 'user_book', foreignKey: 'bookid'})
// User.belongsToMany(Book, {through: 'user_book', foreignKey: 'userid'})
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
//             "Books.user_book.created_at": "2019-06-26T23:53:46.000Z",
//             "Books.user_book.updated_at": "2019-06-26T23:53:42.000Z",
//             "Books.user_book.bookid": 1,
//             "Books.user_book.userid": 1
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
//             "Books.user_book.created_at": "2019-06-26T23:54:08.000Z",
//             "Books.user_book.updated_at": "2019-06-26T23:54:31.000Z",
//             "Books.user_book.bookid": 2,
//             "Books.user_book.userid": 1
//         }
//     ]
// }

export default Record