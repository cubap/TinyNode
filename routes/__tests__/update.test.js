import express from "express"
import request from "supertest"
import updateRoute from "../update.js"
import app from "../../app.js"

const routeTester = new express()
routeTester.use("/update", updateRoute)

describe("Combined unit tests for the '/update' route.", () => {
  it("/update is a registered route in the app.  #exists", () => {
    let exists = false
    const stack = app._router.stack
    for(const middleware of stack){
      if(middleware.regexp && middleware.regexp.toString().includes("/update")) {
         exists = true
         break
       } 
    }
    expect(exists).toBe(true)
  })

    // TODO: Can we avoid creating an object
  it("Incorrect /update route usage has expected RESTful responses.  #rest", () => {
    request(routeTester)
    .get("/update")
    .then(response => {
      expect(response.statusCode).toBe(405)
    })
    .catch(err => err)

    request(routeTester)
    .post("/update")
    .then(response => {
      expect(response.statusCode).toBe(405)
    })
    .catch(err => err)

    request(routeTester)
    .patch("/update")
    .then(response => {
      expect(response.statusCode).toBe(405)
    })
    .catch(err => err)

    request(routeTester)
    .delete("/update")
    .then(response => {
      expect(response.statusCode).toBe(405)
    })
    .catch(err => err)

    request(routeTester)
    .put("/update")
    .send("not json")
    .then(response => {
      expect(response.statusCode).toBe(400)
    })
    .catch(err => err)
  })

  // TODO: Can we avoid updating the RERUM test obj?
  it("Can update the RERUM test obj using the app's /update endpoint.  #e2e", () => {
    request(routeTester)
    .put("/update")
    .send({
      "@id":`${process.env.RERUM_ID_PATTERN}11111`,
      "test":"item"
    })
    .then(response => {
      expect(response.header).toHaveProperty('location')
      expect(response.statusCode).toBe(200)
      expect(response.body.test.toBe("item"))
    })
    .catch(err => err)
  })
})
