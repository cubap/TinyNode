import express from "express"
import request from "supertest"
import { jest } from "@jest/globals"
import dotenv from "dotenv"
dotenv.config()
import deleteRoute from "../delete.js"
import app from "../../app.js"
const routeTester = new express()
routeTester.use(express.json())
routeTester.use(express.urlencoded({ extended: false }))
routeTester.use("/delete", deleteRoute)
routeTester.use("/app/delete", deleteRoute)

const rerum_uri = `${process.env.RERUM_ID_PATTERN}_not_`

beforeEach(() => {
  /** 
   * Request/Response Mock Using manual fetch replacement
   * This is overruling the fetch(store.rerum.io/v1/api/delete) call in delete.js
   */
  global.fetch = jest.fn(() =>
    Promise.resolve({
      text: () => Promise.resolve("")
    })
  )
})

describe("Combined unit tests for the '/delete' route.", () => {
  it("'/app/delete' and '/delete' are registered routes in the app.  __exists __core", () => {
    let exists = false
    let count = 0
    const stack = app._router.stack
    for (const middleware of stack) {
      if (middleware.regexp && middleware.regexp.toString().includes("/app/delete")) {
        count++
      } else if (middleware.regexp && middleware.regexp.toString().includes("/delete")) {
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
 * This test suite runs the logic of the route file 'delete.js' but does not actually communicate with RERUM.
 * It will confirm the following:
 *   - Is the express req/resp sent into the route
 *   - Can the route read the JSON body
 *   - Does the route respond 204
 */
describe("Check that the request/response behavior of the TinyNode delete route functions.  Mock the connection to RERUM.  __mock_functions", () => {
  it("'/delete' route request and response behavior is functioning.", async () => {

    let response = await request(routeTester)
      .delete("/delete")
      .send({ "@id": rerum_uri, "test": "item" })
      .set("Content-Type", "application/json")
      .then(resp => resp)
      .catch(err => err)
    expect(response.statusCode).toBe(204)

    response = await request(routeTester)
      .delete("/delete/00000")
      .then(resp => resp)
      .catch(err => err)
    expect(response.statusCode).toBe(204)
  })

  it("'/app/delete' route request and response behavior is functioning.", async () => {

    let response = await request(routeTester)
      .delete("/app/delete")
      .send({ "@id": rerum_uri, "test": "item" })
      .set("Content-Type", "application/json")
      .then(resp => resp)
      .catch(err => err)
    expect(response.statusCode).toBe(204)

    response = await request(routeTester)
      .delete("/app/delete/00000")
      .then(resp => resp)
      .catch(err => err)
    expect(response.statusCode).toBe(204)
  })
})

describe("Check that incorrect TinyNode delete route usage results in expected RESTful responses from RERUM.  __rest __core", () => {
  it("Incorrect '/app/delete' route usage has expected RESTful responses.", async () => {
    let response = null

    // Wrong Method
    response = await request(routeTester)
      .get("/app/delete")
      .then(resp => resp)
      .catch(err => err)
    expect(response.statusCode).toBe(405)

    response = await request(routeTester)
      .put("/app/delete")
      .then(resp => resp)
      .catch(err => err)
    expect(response.statusCode).toBe(405)

    response = await request(routeTester)
      .patch("/app/delete")
      .then(resp => resp)
      .catch(err => err)
    expect(response.statusCode).toBe(405)

    response = await request(routeTester)
      .post("/app/delete")
      .then(resp => resp)
      .catch(err => err)
    expect(response.statusCode).toBe(405)

    //Bad request body
    //FIXME to uncomment: https://github.com/CenterForDigitalHumanities/TinyNode/issues/89 
    // response = await request(routeTester)
    //   .delete("/app/delete")
    //   .set("Content-Type", "application/json")
    //   .then(resp => resp)
    //   .catch(err => err)
    // expect(response.statusCode).toBe(400)
  })

  it("Incorrect '/delete' route usage has expected RESTful responses.", async () => {
    let response = null

    response = await request(routeTester)
      .get("/delete")
      .then(resp => resp)
      .catch(err => err)
    expect(response.statusCode).toBe(405)

    response = await request(routeTester)
      .put("/delete")
      .then(resp => resp)
      .catch(err => err)
    expect(response.statusCode).toBe(405)

    response = await request(routeTester)
      .patch("/delete")
      .then(resp => resp)
      .catch(err => err)
    expect(response.statusCode).toBe(405)

    response = await request(routeTester)
      .post("/delete")
      .then(resp => resp)
      .catch(err => err)
    expect(response.statusCode).toBe(405)

    //Bad request body
    //FIXME to uncomment: https://github.com/CenterForDigitalHumanities/TinyNode/issues/89
    // response = await request(routeTester)
    //   .delete("/delete")
    //   .set("Content-Type", "application/json")
    //   .then(resp => resp)
    //   .catch(err => err)
    // expect(response.statusCode).toBe(400)

  })
})

/**
 * TODO - skipped for now.
 * Full integration test.  Checks the TinyNode app delete endpoint functionality and RERUM connection.
 * Note this endpoint also has the '/app/delete' alias.
 */
describe.skip("Check that the properly used delete endpoints function and interact with RERUM.  __e2e", () => {
  it("'/delete' route can delete an object in RERUM.  __e2e", async () => {
    const response = await request(routeTester)
      .delete("/app/delete/00000")
      .then(response => {
        expect(response.statusCode).toBe(204)
      })
      .catch(err => err)
    expect(response.statusCode).toBe(204)
  })
})