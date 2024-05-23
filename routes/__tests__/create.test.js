import express from "express"
import request from "supertest"
import createRoute from "../create.js"
import app from "../../app.js"
import {createRequest, createResponse} from 'node-mocks-http'
const routeTester = new express()
routeTester.use("/create", createRoute)

//wrap these separately as their own suite, not necessarily another file

/**
 * To run just the mocks, do npm run mocks
 * Mock lib: https://github.com/eugef/node-mocks-http
 * 
 * Remember to actually test create.js.
 * This test should fail if create.js fails its basic request processings and response building.
 * 
 * This test runs the logic of the route file 'create.js' but does not actually communicate with RERUM.
 * 
 *   Then what is tested exacly in create.js by this test?
 *   - Is the express req/resp sent into the route
 *   - Can the route read the JSON body
 *   - Does the route add @id and __rerum
 *   - Does the route respond 201
 *   - Does the route respond with the object that was in the request body
 *   - Does the route respond with a 'Location' header
 */ 

describe("Playing with a successful mock create.  __mockit", () => {
  it("'/create' route request and response behavior is functioning.", () => {
    /** Request Mock */
    let mock_request = createRequest({
      method: "POST",
      url: "/",
      body: {"test":"item"}  
    })
    let mock_response = createResponse()
    createRoute(mock_request, mock_response)
    const data = mock_response._getJSONData() 
    console.log(mock_response._getHeaders())
    expect(mock_response._getHeaders()).toHaveProperty('location')
    expect(mock_response.statusCode).toBe(201)
    expect(data["test"]).toBe("item")
  })
})


describe("Combined unit tests for the '/create' route.", () => {
  it("'/app/create' and '/create' are registered routes in the app.  __exists __core", () => {
    let exists = false
    let count = 0
    const stack = app._router.stack
    for(const middleware of stack){
      if(middleware.regexp && middleware.regexp.toString().includes("/app/create")) {
        count++
      }
      else if(middleware.regexp && middleware.regexp.toString().includes("/create")) {
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
  it("Incorrect '/app/create' route usage has expected RESTful responses.  __rest __core", () => {
    request(routeTester)
    .get("/app/create")
    .then(response => {
      expect(response.statusCode).toBe(405)
    })
    .catch(err => err)

    request(routeTester)
    .put("/app/create")
    .then(response => {
      expect(response.statusCode).toBe(405)
    })
    .catch(err => err)

    request(routeTester)
    .patch("/app/create")
    .then(response => {
      expect(response.statusCode).toBe(405)
    })
    .catch(err => err)

    request(routeTester)
    .delete("/app/create")
    .then(response => {
      expect(response.statusCode).toBe(405)
    })
    .catch(err => err)

    request(routeTester)
    .post("/app/create")
    .send("not json")
    .then(response => {
      expect(response.statusCode).toBe(400)
    })
    .catch(err => err)
  })

  // TODO: Can we avoid creating an object
  it("'/app/create' route can save an object to RERUM.  __e2e", () => {
    request(routeTester)
    .post("/app/create")
    .send({"test":"item"})
    .then(response => {
      expect(response.header).toHaveProperty('location')
      expect(response.statusCode).toBe(201)
      expect(response.body.test.toBe("item"))
    })
    .catch(err => err)
  })

  // TODO: Can we avoid creating an object
  it("Incorrect '/create' route usage has expected RESTful responses.  __rest __core", () => {
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

  // This is a full integration test that we need that should fail when RERUM is down
  
  // TODO: Can we avoid creating an object
  it("'/create' route can save an object to RERUM.  __e2e", () => {
    request(routeTester)
    .post("/create")
    .send({"test":"item"})
    .then(response => {
      expect(response.header).toHaveProperty('location')
      expect(response.statusCode).toBe(201)
      expect(response.body.test).toBe("item")
    })
    .catch(err => err)
  })

})
