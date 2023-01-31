const express = require('express')
const router = express.Router()
const got = require('got')

/* DELETE a delete to the thing. */
router.delete('/:id', async (req, res, next) => {

  try {
    const deleteBody = {'@id':`${process.env.RERUM_ID_PATTERN}${req.params.id}`}

    const deleteOptions = {
      json: deleteBody,
      headers: {
        'user-agent': 'Tiny-Node',
        'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
      }
    }
    console.log(deleteBody)
    console.log(JSON.stringify(deleteBody))
    const deleteURL = `${process.env.RERUM_API_ADDR}delete`
    const result = await got.delete(deleteURL, deleteOptions).text()
    res.status(204)
    res.send(result)
  }
  catch (err) {
    console.log(err)
    res.status(500).send("Caught Error:" + err)
  }
})

module.exports = router
