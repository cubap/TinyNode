const express = require('express')
const router = express.Router()

/* POST a create to the thing. */
router.post('/', async (req, res, next) => {

  try {
    // check body for JSON
    const body = JSON.stringify(req.body)
    const createOptions = {
      method: 'POST',
      body,
      headers: {
        'user-agent': 'Tiny-Node',
        'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`, // not required for query
        'Content-Type' : "application/json;charset=utf-8"
      }
    }
    const createURL = `${process.env.RERUM_API_ADDR}create`
    const result = await fetch(createURL, createOptions).then(res=>res.json())
    .catch(err=>next(err))
    res.setHeader("Location", result["@id"])
    res.status(201)
    res.send(result)
  }
  catch (err) {
    console.log(err)
    res.status(500).send("Caught Error:" + err)
  }
})

module.exports = router
