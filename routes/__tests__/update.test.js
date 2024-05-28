import express from "express"
import request from "supertest"
import { jest } from "@jest/globals"
import dotenv from "dotenv"
dotenv.config()
import updateRoute from "../update.js"
import app from "../../app.js"
const routeTester = new express()
routeTester.use(express.json())
routeTester.use(express.urlencoded({ extended: false }))
routeTester.use("/update", updateRoute)
routeTester.use("/app/update", updateRoute)

const rerum_uri_orig = `${process.env.RERUM_ID_PATTERN}_not_`
const rerum_uri_updated = `${process.env.RERUM_ID_PATTERN}_updated_`
const rerum_tiny_test_obj_id = `${process.env.RERUM_ID_PATTERN}tiny_tester`

beforeEach(() => {
  /** 
   * Request/Response Mock Using manual fetch replacement
   * This is overruling the fetch(store.rerum.io/v1/api/create) call in create.js
   */
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ "@id": rerum_uri_updated, "testing": "item", "__rerum": { "stuff": "here" } })
    })
  )
})

afterEach(() => {
  /**
   * Food for thought: delete data generated by tests?  
   * Make a test.store available that uses the same annotationStoreTesting as RERUM tests?
   */
})

/**
 * This test suite uses the built app.js app and checks that the expected update endpoints are registered.
 *  - /update
 *  - /app/update
 */
describe("Check that the expected TinyNode update route patterns are registered.", () => {
  it("'/app/update' and '/update' are registered routes in the app.  __exists __core", () => {
    let exists = false
    let count = 0
    const stack = app._router.stack
    for (const middleware of stack) {
      if (middleware.regexp && middleware.regexp.toString().includes("/app/update")) {
        count++
      } else if (middleware.regexp && middleware.regexp.toString().includes("/update")) {
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

/**
 * This test suite runs the logic of the route file 'update.js' but does not actually communicate with RERUM.
 * It will confirm the following:
 *   - Is the express req/resp sent into the route
 *   - Can the route read the JSON body
 *   - Does the route add @id and __rerum
 *   - Does the route respond 200
 *   - Does the route respond with the object that was in the request body
 *   - Does the route respond with the proper 'Location' header
 */
describe("Check that the request/response behavior of the TinyNode update route functions.  Mock the connection to RERUM.  __mock_functions", () => {
  it("'/update' route request and response behavior is functioning.", async () => {
    const response = await request(routeTester)
      .put("/update")
      .send({ "@id": rerum_uri_orig, "testing": "item" })
      .set("Content-Type", "application/json")
      .then(resp => resp)
      .catch(err => err)
    //FIXME to uncomment these: https://github.com/CenterForDigitalHumanities/TinyNode/issues/88
    //expect(response.header.location).toBe(rerum_uri_updated)
    expect(response.statusCode).toBe(200)
    expect(response.body.testing).toBe("item")
  })

  it("'/app/update' route request and response behavior is functioning.", async () => {

    /** 
     * Request/Response Mock Using manual fetch replacement
     * This is overruling the fetch(store.rerum.io/v1/api/update) call in update.js
     */
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ "@id": rerum_uri_updated, "testing": "item", "__rerum": { "stuff": "here" } })
      })
    )

    const response = await request(routeTester)
      .put("/app/update")
      .send({ "@id": rerum_uri_orig, "testing": "item" })
      .set("Content-Type", "application/json")
      .then(resp => resp)
      .catch(err => err)
    //FIXME to uncomment these: https://github.com/CenterForDigitalHumanities/TinyNode/issues/88
    //expect(response.header.location).toBe(rerum_uri_updated)
    expect(response.statusCode).toBe(200)
    expect(response.body.testing).toBe("item")
  })
})

/**
 * This test suite checks the RESTful responses when using the TinyNode update endpoint incorrectly.
 *
 *  - Incorrect HTTP method
 *  - Invalid JSON body
 */
describe("Check that incorrect TinyNode update route usage results in expected RESTful responses from RERUM.  __rest __core", () => {
  it("Incorrect '/app/update' route usage has expected RESTful responses.", async () => {
    let response = null
    // Wrong Method

    response = await request(routeTester)
      .get("/app/update")
      .then(resp => resp)
      .catch(err => err)
    expect(response.statusCode).toBe(405)

    response = await request(routeTester)
      .post("/app/update")
      .then(resp => resp)
      .catch(err => err)
    expect(response.statusCode).toBe(405)

    response = await request(routeTester)
      .patch("/app/update")
      .then(resp => resp)
      .catch(err => err)
    expect(response.statusCode).toBe(405)

    response = await request(routeTester)
      .delete("/app/update")
      .then(resp => resp)
      .catch(err => err)
    expect(response.statusCode).toBe(405)

    // Bad request body
    response = await request(routeTester)
      .put("/app/update")
      .set("Content-Type", "application/json")
      .send("not json")
      .then(resp => resp)
      .catch(err => err)
    expect(response.statusCode).toBe(400)

    response = await request(routeTester)
      .put("/app/update")
      .set("Content-Type", "application/json")
      .send({ "no": "@id" })
      .then(resp => resp)
      .catch(err => err)
    expect(response.statusCode).toBe(400)
  })

  it("Incorrect '/update' route usage has expected RESTful responses.", async () => {
    let response = null

    response = await request(routeTester)
      .get("/update")
      .then(resp => resp)
      .catch(err => err)
    expect(response.statusCode).toBe(405)

    response = await request(routeTester)
      .post("/update")
      .then(resp => resp)
      .catch(err => err)
    expect(response.statusCode).toBe(405)

    response = await request(routeTester)
      .patch("/update")
      .then(resp => resp)
      .catch(err => err)
    expect(response.statusCode).toBe(405)

    response = await request(routeTester)
      .delete("/update")
      .then(resp => resp)
      .catch(err => err)
    expect(response.statusCode).toBe(405)

    //Bad request body
    response = await request(routeTester)
      .put("/update")
      .set("Content-Type", "application/json")
      .send("not json")
      .then(resp => resp)
      .catch(err => err)
    expect(response.statusCode).toBe(400)

    response = await request(routeTester)
      .put("/update")
      .set("Content-Type", "application/json")
      .send({ "no": "@id" })
      .then(resp => resp)
      .catch(err => err)
    expect(response.statusCode).toBe(400)

  })
})

/**
 * Full integration test.  Checks the TinyNode app update endpoint functionality and RERUM connection.
 * Note this endpoint also has the '/app/update' alias.
 */
describe("Check that the properly used update endpoints function and interact with RERUM.  __e2e", () => {
  it("'/update' route can update an object in RERUM.", async () => {
    const response = await request(routeTester)
      .put("/update")
      .send({ "@id": rerum_tiny_test_obj_id, "testing": "item" })
      .set("Content-Type", "application/json")
      .then(resp => resp)
      .catch(err => err)
    //FIXME to uncomment these: https://github.com/CenterForDigitalHumanities/TinyNode/issues/88
    //expect(response.header).toHaveProperty("location")
    //expect(response.header.location).not().toBe(rerum_tiny_test_obj_id)
    expect(response.statusCode).toBe(200)
    expect(response.body.testing).toBe("item")
  })
})