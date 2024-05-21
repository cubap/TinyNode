import express from "express"
import request from "supertest"
import overwriteRoute from "../overwrite.js"
import app from "../../app.js"

const routeTester = new express()
routeTester.use("/overwrite ", overwriteRoute)

describe("Combined unit tests for the '/overwrite ' route.", () => {
  it("/overwrite  is a registered route in the app.  #exists", () => {
    let exists = false
    const stack = app._router.stack
    for(const middleware of stack){
      if(middleware.regexp && middleware.regexp.toString().includes("/overwrite")) {
         exists = true
         break
       } 
    }
    expect(exists).toBe(true)
  })

  // TODO: Test overwrite capabilities
  it.skip("Can overwrite the RERUM test obj using the app's /overwrite endpoint.  #e2e", () => {
    expect(true).toBe(true)
    // request(routeTester)
    // .put("/overwrite ")
    // .send({
    //   "@id":`${process.env.RERUM_ID_PATTERN}11111`,
    //   "test":"item"
    // })
    // .then(response => {
    //   expect(response.header).toHaveProperty('location')
    //   expect(response.statusCode).toBe(200)
    //   done()
    // })
    // .catch(err => done(err))

  })
})