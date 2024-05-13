const express = require('express')
const router = express.Router()
const got = require('got')

/* POST a query to the thing. */
router.post('/', async (req, res, next) => {
  const lim = req.query.limit ?? 10
  const skip = req.query.skip ?? 0

  try {
    // check body for JSON
    JSON.stringify(req.body)
    const queryBody = req.body
    // check limit and skip for INT
    if (isNaN(parseInt(lim) + parseInt(skip))
      || (lim < 0)
      || (skip < 0)) {
      throw Error("`limit` and `skip` values must be positive integers or omitted.")
    }
    const queryOptions = {
      json: queryBody,
      headers: {
        'user-agent': 'Tiny-Things/1.0',
        'Authorization': `Bearer ${process.env.RERUM_TOKEN}`, // not required for query
        'Content-Type' : "application/json;charset=utf-8"
      }
    }
    const queryURL = `${process.env.RERUM_API_ADDR}query?limit=${lim}&skip=${skip}`
    const results = await got.post(queryURL, queryOptions).json()
    res.status(200)
    res.send(results)
  }
  catch (err) { // a dumb catch-all for Tiny Stuff
    console.log(err)
    res.status(500).send("Caught " + err)
  }
})

module.exports = router
