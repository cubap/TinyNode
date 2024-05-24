import express from "express"
import request from "supertest"
import { jest } from '@jest/globals'
import createRoute from "../create.js"
import app from "../../app.js"
const routeTester = new express()
routeTester.use(express.json())
routeTester.use(express.urlencoded({ extended: false }))
routeTester.use("/create", createRoute)
routeTester.use("/app/create", createRoute)


/**
 * This test suite runs the logic of the route file 'create.js' but does not actually communicate with RERUM.
 * 
 *   Then what is tested exacly in create.js by this test?
 *   - Is the express req/resp sent into the route
 *   - Can the route read the JSON body
 *   - Does the route add @id and __rerum
 *   - Does the route respond 201
 *   - Does the route respond with the object that was in the request body
 *   - Does the route respond with a 'Location' header
 */
describe("Check that the request/response behavior of the TinyNode create route functions.  Mock the connection to RERUM.  __mock_functions", () => {
  it("'/create' route request and response behavior is functioning.", async () => {

    /** 
     * Request/Response Mock Using manual fetch replacement
     * This is overruling the fetch(store.rerum.io/v1/api/create) call in create.js
     */
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ "@id": "https://devstore.rerum.io/v1/id/_not_", "test": "item", "__rerum": { "stuff": "here" } })
      })
    )

    const response = await request(routeTester)
      .post("/create")
      .send({ "test": "item" })
      .set("Content-Type", "application/json")
      .then(resp => resp)
      .catch(err => err)
    expect(response.header).toHaveProperty('location')
    expect(response.statusCode).toBe(201)
    expect(response.body.test).toBe("item")
  })
})


/**
 * This test suite uses the built app.js app and checks that the expected create endpoints are registered.
 *  - /create
 *  - /app/create
 */
describe("Check that the expected TinyNode create route patterns are registered.", () => {
  it("'/app/create' and '/create' are registered routes in the app.  __exists __core", () => {
    let exists = false
    let count = 0
    const stack = app._router.stack
    for (const middleware of stack) {
      if (middleware.regexp && middleware.regexp.toString().includes("/app/create")) {
        count++
      } else if (middleware.regexp && middleware.regexp.toString().includes("/create")) {
        count++
      }
      if (count === 2) {
        exists = true
        break
      }
    }
    expect(exists).toBe(true)
  })
})

describe("Check that incorrect TinyNode create route usage results in expected RESTful responses from RERUM.", () => {
  it("Incorrect '/app/create' route usage has expected RESTful responses.  __rest __core", async () => {
    let response = null
    // Wrong Method
    response = await request(routeTester)
      .get("/app/create")
      .then(resp => resp)
      .catch(err => err)
    expect(response.statusCode).toBe(405)

    response = await request(routeTester)
      .put("/app/create")
      .then(resp => resp)
      .catch(err => err)
    expect(response.statusCode).toBe(405)

    response = await request(routeTester)
      .patch("/app/create")
      .then(resp => resp)
      .catch(err => err)
    expect(response.statusCode).toBe(405)

    response = await request(routeTester)
      .delete("/app/create")
      .then(resp => resp)
      .catch(err => err)
    expect(response.statusCode).toBe(405)

    response = await request(routeTester)
      .get("/app/create")
      .then(resp => resp)
      .catch(err => err)
    expect(response.statusCode).toBe(405)

    // Bad request body
    response = await request(routeTester)
      .post("/app/create")
      .set("Content-Type", "application/json")
      .send("not json")
      .then(resp => resp)
      .catch(err => err)
    expect(response.statusCode).toBe(400)
  })

  it("Incorrect '/create' route usage has expected RESTful responses.  __rest __core", async () => {
    let response = null

    response = await request(routeTester)
      .get("/create")
      .then(resp => resp)
      .catch(err => err)
    expect(response.statusCode).toBe(405)

    response = await request(routeTester)
      .put("/create")
      .then(resp => resp)
      .catch(err => err)
    expect(response.statusCode).toBe(405)

    response = await request(routeTester)
      .patch("/create")
      .then(resp => resp)
      .catch(err => err)
    expect(response.statusCode).toBe(405)

    response = await request(routeTester)
      .delete("/create")
      .then(resp => resp)
      .catch(err => err)
    expect(response.statusCode).toBe(405)

    response = await request(routeTester)
      .get("/create")
      .then(resp => resp)
      .catch(err => err)
    expect(response.statusCode).toBe(405)

    response = await request(routeTester)
      .post("/create")
      .set("Content-Type", "application/json")
      .send("not json")
      .then(resp => resp)
      .catch(err => err)
    expect(response.statusCode).toBe(400)

  })
})

/**
 * Full integration test.  Checks the TinyNode app functionality and RERUM connection.
 */
describe("Check that the properly used create endpoints function and interact with RERUM.", () => {
  it("'/app/create' route can save an object to RERUM.  __e2e", async () => {
    const response = await request(routeTester)
      .post("/app/create")
      .send({ "test": "item" })
      .set("Content-Type", "application/json")
      .then(resp => resp)
      .catch(err => err)
    expect(response.header).toHaveProperty('location')
    expect(response.statusCode).toBe(201)
    expect(response.body.test).toBe("item")
  })

  it("'/create' route can save an object to RERUM.  __e2e", async () => {
    const response = await request(routeTester)
      .post("/create")
      .send({ "test": "item" })
      .set("Content-Type", "application/json")
      .then(resp => resp)
      .catch(err => err)
    expect(response.header).toHaveProperty('location')
    expect(response.statusCode).toBe(201)
    expect(response.body.test).toBe("item")
  })
})
