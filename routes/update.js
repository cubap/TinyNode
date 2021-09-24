const express = require('express')
const router = express.Router()
const got = require('got')

/* PUT an update to the thing. */
router.put('/', async (req, res, next) => {

  try {
    // check body for JSON
    JSON.stringify(req.body)
    const updateBody = req.body

    // check for @id; any value is valid
    if(!(updateBody['@id']??updateBody.id) {
      throw Error("No record id to update! (https://centerfordigitalhumanities.github.io/rerum_server/API.html#update)")
    }

    const updateOptions = {
      json: updateBody,
      headers: {
        'user-agent': 'Tiny-Node',
        'Authorization': `Bearer ${process.env.access_token}` // not required for query
      }
    }
    const queryURL = `${process.env.RERUM_URL}${process.env.CREATE}`
    const result = await got.post(queryURL, updateOptions)
      .then((saved) => {
        res.setHeader("Location", saved.headers["location"])
      })
    res.status(200)
    res.send(result)
  }
  catch (err) {
    console.log(err)
    res.status(500).send("Caught Error:" + err)
  }
})

module.exports = router
