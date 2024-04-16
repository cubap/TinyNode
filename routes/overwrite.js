const express = require('express')
const router = express.Router()

/* PUT an overwrite to the thing. */
router.put('/', async (req, res, next) => {

  try {
    // check body for JSON
    JSON.stringify(req.body)
    const overwriteBody = req.body

    // check for @id; any value is valid
    if (!(overwriteBody['@id'] ?? overwriteBody.id)) {
      throw Error("No record id to overwrite! (https://centerfordigitalhumanities.github.io/rerum_server/API.html#overwrite)")
    }

    const overwriteOptions = {
      method: 'PUT',
      body: overwriteBody,
      headers: {
        'user-agent': 'Tiny-Node',
        'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
        'Content-Type' : "application/json;charset=utf-8"
      }
    }
    const overwriteURL = `${process.env.RERUM_API_ADDR}overwrite`
    const result = await fetch(overwriteURL, overwriteOptions).then(res=>res.json())
    res.status(200)
    res.send(result)
  }
  catch (err) {    
    console.log(err)
    res.status(500).send("Caught Error:" + err)
  }
})

module.exports = router
