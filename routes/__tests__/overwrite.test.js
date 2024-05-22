import express from "express"
import request from "supertest"
import overwriteRoute from "../overwrite.js"
import app from "../../app.js"

const routeTester = new express()
routeTester.use("/overwrite ", overwriteRoute)

describe("Combined unit tests for the '/overwrite ' route.", () => {
  it("'/app/overwrite' and '/overwrite' are registered routes in the app.  #exists", () => {
    let exists = false
    let count = 0
    const stack = app._router.stack
    for(const middleware of stack){
      if(middleware.regexp && middleware.regexp.toString().includes("/app/overwrite")) {
        count++
      }
      else if(middleware.regexp && middleware.regexp.toString().includes("/overwrite")) {
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
  it("Incorrect '/app/overwrite' route usage has expected RESTful responses.  #rest_functions", () => {
    request(routeTester)
    .get("/app/overwrite")
    .then(response => {
      expect(response.statusCode).toBe(405)
    })
    .catch(err => err)

    request(routeTester)
    .post("/app/overwrite")
    .then(response => {
      expect(response.statusCode).toBe(405)
    })
    .catch(err => err)

    request(routeTester)
    .patch("/app/overwrite")
    .then(response => {
      expect(response.statusCode).toBe(405)
    })
    .catch(err => err)

    request(routeTester)
    .delete("/app/overwrite")
    .then(response => {
      expect(response.statusCode).toBe(405)
    })
    .catch(err => err)

    request(routeTester)
    .put("/app/overwrite")
    .send("not json")
    .then(response => {
      expect(response.statusCode).toBe(400)
    })
    .catch(err => err)
  })

  // TODO: Test overwrite capabilities
  it.skip("Can overwrite the RERUM test obj using the app's '/app/overwrite' route.  #e2e", () => {
    expect(true).toBe(true)
    // request(routeTester)
    // .put("/app/overwrite ")
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

  // TODO: Can we avoid creating an object
  it("Incorrect '/overwrite' route usage has expected RESTful responses.  #rest_functions", () => {
    request(routeTester)
    .get("/overwrite")
    .then(response => {
      expect(response.statusCode).toBe(405)
    })
    .catch(err => err)

    request(routeTester)
    .post("/overwrite")
    .then(response => {
      expect(response.statusCode).toBe(405)
    })
    .catch(err => err)

    request(routeTester)
    .patch("/overwrite")
    .then(response => {
      expect(response.statusCode).toBe(405)
    })
    .catch(err => err)

    request(routeTester)
    .delete("/overwrite")
    .then(response => {
      expect(response.statusCode).toBe(405)
    })
    .catch(err => err)

    request(routeTester)
    .put("/overwrite")
    .send("not json")
    .then(response => {
      expect(response.statusCode).toBe(400)
    })
    .catch(err => err)
  })

  // TODO: Test overwrite capabilities
  it.skip("Can overwrite the RERUM test obj using the app's '/overwrite' route.  #e2e", () => {
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