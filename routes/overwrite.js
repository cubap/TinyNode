import express from "express"
const router = express.Router()

/* PUT an overwrite to the thing. */
router.put('/', async (req, res, next) => {

  try {
    // check body for JSON
    const body = JSON.stringify(req.body)

    // check for @id; any value is valid
    if (!(req.body['@id'] ?? req.body.id)) {
      throw Error("No record id to overwrite! (https://centerfordigitalhumanities.github.io/rerum_server/API.html#overwrite)")
    }

    const overwriteOptions = {
      method: 'PUT',
      body,
      headers: {
        'user-agent': 'Tiny-Things/1.0',
        'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
        'Content-Type' : "application/json;charset=utf-8"
      }
    }
    const overwriteURL = `${process.env.RERUM_API_ADDR}overwrite`
    const result = await fetch(overwriteURL, overwriteOptions).then(res=>res.json())
    .catch(err=>next(err))
    res.status(200)
    res.send(result)
  }
  catch (err) {    
    console.log(err)
    res.status(500).send("Caught Error:" + err)
  }
})

router.all('/', (req, res, next) => {
  res.status(405).send("Method Not Allowed")
})

export default router
