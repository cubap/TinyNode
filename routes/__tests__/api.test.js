const request = require("supertest")
const app = require("../../app")

describe("Test /create", () => {
  test("New Object saved", async () => {
    const response = await request(app)
    .post("/create")
    .send({test:"item"})
    expect(response.statusCode).toBe(201)
  })
})

// describe("Test the root path", () => {
//   test("It should response the GET method", async () => {
//     const response = await request(app).get("/")
//     expect(response.statusCode).toBe(200)
//   })
// })

// describe("Test the root path", () => {
//   test("It should response the GET method", async () => {
//     const response = await request(app).get("/")
//     expect(response.statusCode).toBe(200)
//   })
// })

// describe("Test the root path", () => {
//   test("It should response the GET method", async () => {
//     const response = await request(app).get("/")
//     expect(response.statusCode).toBe(200)
//   })
// })

// describe("Test the root path", () => {
//   test("It should response the GET method", async () => {
//     const response = await request(app).get("/")
//     expect(response.statusCode).toBe(200)
//   })
// })

