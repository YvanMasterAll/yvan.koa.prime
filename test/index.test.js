const supertest = require('supertest')
const chai = require('chai')
import app from '../src/app'
const moment = require('moment')

// const expect = chai.expect
const assert = chai.assert
const request = supertest(app.listen())

/// 因为时间问题，单元测试写的比较少，该测试文件是一个临时文件
/// 命令行 > npm run test:test

// 用户登录测试
// describe('用户登录测试', () => {
    
//     it('登录请求', (done) => {
//         request
//             .post('/api/auth/signin?name=test&password=test')
//             .expect(200)
//             .end(( err, res ) => {
//                 console.log(res.body)
//                 assert.equal(res.body.code, 200)
//                 // expect(res.body.data).to.be.an('string')
//                 done()
//             })
//     })
// })

// 时间比较测试
describe('测试时间比较', () => {

    it('开始测试', (done) => {
        let start = moment('2020-01-04 02:00:00')
        let end = moment('2020-01-04 10:00:00')
        let hours = end.diff(start, 'hours')
        console.log(hours)
        console.log(Math.round(hours/24/0.5)*0.5)
        done()
    })
})