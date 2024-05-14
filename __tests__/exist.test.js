let request = require("supertest")

//Fun fact, if you don't require app, you don't get coverage even though the tests run just fine.
const app = require('../app')

it('/ -- Make sure index exists', function(done) {
  request(app)
    .get("/index.html")
    .expect(200)
    .then(response => {
        done()
    })
    .catch(err => done(err))
})
