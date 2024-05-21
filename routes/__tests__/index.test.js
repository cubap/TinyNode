import express from "express"
import request from "supertest"
import indexRoute from "../index.js"

const routeTester = new express()
routeTester.use("/", indexRoute)

it("responds to / with a 200 status and and the index.html page.", () => {
  request(routeTester).get("/")
  .then(response => {
      expect(res.statusCode).toBe(200)
      expect(res.type).toMatch(/html/)
  })
  .catch(err => err)
})

