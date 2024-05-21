import express from "express"
import request from "supertest"
import deleteRoute from "../delete.js"
import app from "../../app.js"

const routeTester = new express()
routeTester.use("/delete", deleteRoute)

describe("Combined unit tests for the '/delete' route.", () => {
  it("/delete is a registered route in the app.  #exists", () => {
    let exists = false
    const stack = app._router.stack
    for(const middleware of stack){
      if(middleware.regexp && middleware.regexp.toString().includes("/delete")) {
         exists = true
         break
       } 
    }
    expect(exists).toBe(true)
  })

  // TODO: Test delete capabilities.
  it.skip("/delete route can delete an object in RERUM.  #e2e", () => {
    expect(true).toBe(true)
    // request(routeTester)
    // .delete("/delete/00000")
    // .then(response => {
    //     expect(response.statusCode).toBe(204)
    //     done()
    // })
    // .catch(err => done(err))
    // expect(response.statusCode).toBe(204)
  })
})
