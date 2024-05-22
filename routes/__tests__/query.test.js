import express from "express"
import request from "supertest"
import queryRoute from "../query.js"
import app from "../../app.js"

const routeTester = new express()
routeTester.use("/query", queryRoute)

describe("Combined unit tests for the '/query' route.", () => {
  it("'/app/query' and '/query' are registered routes in the app.  #exists", () => {
    let exists = false
    let count = 0
    const stack = app._router.stack
    for(const middleware of stack){
      if(middleware.regexp && middleware.regexp.toString().includes("/app/query")) {
        count++
      }
      else if(middleware.regexp && middleware.regexp.toString().includes("/query")) {
        count++
      } 
      if(count === 2){
        exists = true
        break
      }
    }
    expect(exists).toBe(true)
  })

    // TODO: Can we avoid creating an object
  it("Incorrect '/app/query' route usage has expected RESTful responses.  #rest_functions", () => {
    request(routeTester)
    .get("/app/query")
    .then(response => {
      expect(response.statusCode).toBe(405)
    })
    .catch(err => err)

    request(routeTester)
    .put("/app/query")
    .then(response => {
      expect(response.statusCode).toBe(405)
    })
    .catch(err => err)

    request(routeTester)
    .patch("/app/query")
    .then(response => {
      expect(response.statusCode).toBe(405)
    })
    .catch(err => err)

    request(routeTester)
    .delete("/app/query")
    .then(response => {
      expect(response.statusCode).toBe(405)
    })
    .catch(err => err)

    request(routeTester)
    .post("/app/query")
    .send("not json")
    .then(response => {
      expect(response.statusCode).toBe(400)
    })
    .catch(err => err)
  })

  it("Can query for objects in RERUM using the app's '/app/query' route.  #e2e", () => {
    request(routeTester)
    .post("/app/query")
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

  // TODO: Can we avoid creating an object
  it("Incorrect '/query' route usage has expected RESTful responses.  #rest_functions", () => {
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

  it("Can query for objects in RERUM using the app's '/query' route.  #e2e", () => {
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