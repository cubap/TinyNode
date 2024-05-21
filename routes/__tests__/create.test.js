import express from "express"
import request from "supertest"
import createRoute from "../create.js"
import app from "../../app.js"

const routeTester = new express()
routeTester.use("/create", createRoute)

describe("Combined unit tests for the '/create' route.", () => {
  it("/create is a registered route in the app.  #exists", () => {
    let exists = false
    const stack = app._router.stack
    for(const middleware of stack){
      if(middleware.regexp && middleware.regexp.toString().includes("/create")) {
         exists = true
         break
       } 
    }
    expect(exists).toBe(true)
  })

  // TODO: Can we avoid creating an object
  it("Incorrect /create route usage has expected RESTful responses.  #rest", () => {
    request(routeTester)
    .get("/create")
    .then(response => {
      expect(response.statusCode).toBe(405)
    })
    .catch(err => err)

    request(routeTester)
    .put("/create")
    .then(response => {
      expect(response.statusCode).toBe(405)
    })
    .catch(err => err)

    request(routeTester)
    .patch("/create")
    .then(response => {
      expect(response.statusCode).toBe(405)
    })
    .catch(err => err)

    request(routeTester)
    .delete("/create")
    .then(response => {
      expect(response.statusCode).toBe(405)
    })
    .catch(err => err)

    request(routeTester)
    .post("/create")
    .send("not json")
    .then(response => {
      expect(response.statusCode).toBe(400)
    })
    .catch(err => err)
  })

  // TODO: Can we avoid creating an object
  it("/create route can save an object to RERUM.  #e2e", () => {
    request(routeTester)
    .post("/create")
    .send({"test":"item"})
    .then(response => {
      expect(response.header).toHaveProperty('location')
      expect(response.statusCode).toBe(201)
      expect(response.body.test.toBe("item"))
    })
    .catch(err => err)
  })
})
