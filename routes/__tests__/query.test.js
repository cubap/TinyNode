import express from "express"
import request from "supertest"
import queryRoute from "../query.js"
import app from "../../app.js"

const routeTester = new express()
routeTester.use("/query", queryRoute)

describe("Combined unit tests for the '/query' route.", () => {
  it("/query is a registered route in the app.  #exists", () => {
    let exists = false
    const stack = app._router.stack
    for(const middleware of stack){
      if(middleware.regexp && middleware.regexp.toString().includes("/query")) {
         exists = true
         break
       } 
    }
    expect(exists).toBe(true)
  })

    // TODO: Can we avoid creating an object
  it("Incorrect /query route usage has expected RESTful responses.  #rest", () => {
    request(routeTester)
    .get("/query")
    .then(response => {
      expect(response.statusCode).toBe(405)
    })
    .catch(err => err)

    request(routeTester)
    .put("/query")
    .then(response => {
      expect(response.statusCode).toBe(405)
    })
    .catch(err => err)

    request(routeTester)
    .patch("/query")
    .then(response => {
      expect(response.statusCode).toBe(405)
    })
    .catch(err => err)

    request(routeTester)
    .delete("/query")
    .then(response => {
      expect(response.statusCode).toBe(405)
    })
    .catch(err => err)

    request(routeTester)
    .post("/query")
    .send("not json")
    .then(response => {
      expect(response.statusCode).toBe(400)
    })
    .catch(err => err)
  })

  it("Can query for objects in RERUM using the app's /query endpoint.  #e2e", () => {
    request(routeTester)
    .post("/query")
    .send({
      "test":"item"
    })
    .then(response => {
        expect(response.statusCode).toBe(200)
        expect(Array.isArray(response.body)).toBe(true)
        expect(response.body.length).toBeTruthy()
    })
    .catch(err => err)
  })
})