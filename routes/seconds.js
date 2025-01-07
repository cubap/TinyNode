import express from "express"
const router = express.Router()

/* POST a query to the thing. */
router.get('/:_seconds', async (req, res, next) => {
  try {
    let time = parseInt(req.params["_seconds"])
    const queryURL = `${process.env.RERUM_REGISTRATION_URL.replace("v1", "")}seconds/${time}`
    console.log(queryURL)
    const results = await fetch(queryURL).then(res=>res.text())
    .catch(err=>next(err))
    res.status(200)
    res.send(results)
  }
  catch (err) { // a dumb catch-all for Tiny Stuff
    next(err)
  }
})

router.all('/', (req, res, next) => {
  res.status(405).send("Method Not Allowed")
})

export default router
