const supertest = require('supertest')
const chai = require('chai')
import app from '../src/app'

// const expect = chai.expect
const assert = chai.assert
const request = supertest(app.listen())

/// 因为时间问题，单元测试写的比较少

// 用户登录测试
describe( '用户登录测试', () => {
    
    it('登录请求', (done) => {
        request
            .post('/api/auth/signin?name=test&password=test')
            .expect(200)
            .end(( err, res ) => {
                console.log(res.body)
                assert.equal(res.body.code, 200)
                // expect(res.body.data).to.be.an('string')
                done()
            })
  })
})