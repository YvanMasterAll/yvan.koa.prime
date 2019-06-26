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

//Record.belongsTo(User, {foreignKey: 'userid', constraints: false})
//Record.belongsTo(Book, {foreignKey: 'bookid', constraints: false})

User.belongsToMany(Book, )
through

export default Record