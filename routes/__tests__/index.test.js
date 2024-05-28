import request from "supertest"
//Fun fact, if you don't require app, you don't get coverage even though the tests run just fine.
import app from "../../app.js"

describe("Make sure TinyNode demo interface is present.  __core", () => {
  it("/index.html", async () => {
    const response = await request(app)
      .get("/index.html")
      .then(resp => resp)
      .catch(err => err)
    console.log(response.header)
    expect(response.statusCode).toBe(200)
    expect(response.header["content-type"]).toMatch(/html/)
  })
})