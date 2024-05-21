import dotenv from "dotenv"
dotenv.config()
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
