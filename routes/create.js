import express from "express"
const router = express.Router()

/* POST a create to the thing. */
router.post('/', async (req, res, next) => {
  try {
    const body = JSON.stringify(req.body)
    // Make a valid looking result to use for testing.
    let result = JSON.parse(JSON.stringify(req.body))
    result["@id"] = "https://store.rerum.io/v1/id/_not_"
    result["__rerum"] = {"stuff":"here"}
    const createOptions = {
      method: 'POST',
      body,
      headers: {
        'user-agent': 'Tiny-Things/1.0',
        'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`, // not required for query
        'Content-Type' : "application/json;charset=utf-8"
      }
    }
    const createURL = `${process.env.RERUM_API_ADDR}create`
    // accomodate a JEST test attempting to test the req/resp behavior without involving RERUM
    // https://stackoverflow.com/questions/50940640/how-to-determine-if-jest-is-running-the-code-or-not/52231746#52231746
    // console.log(process.env.JEST_WORKER_ID)
    // if(process.env.JEST_WORKER_ID === undefined || process.env.NODE_ENV !== 'test'){
    //   // POST to RERUM to generate a result object
    //   result = await fetch(createURL, createOptions)
    //     .then(res => res.json())
    //     .catch(err=> next(err))
    // }

    // Mock libraries hard fail on this line of code and return a headerless empty 200 response.
    // If we want to test this file, we need to circumvent this fetch when a test is using this route.
    result = await fetch(createURL, createOptions)
        .then(res => res.json())
        .catch(err=> next(err))
    res.setHeader("Location", result["@id"])
    res.status(201)
    console.log("CREATE ROUTE create.js sending a response")
    res.json(result)
  }
  catch (err) {
    console.log("CAN'T DO IT II")
    console.log(err)
    res.status(500).send("Caught Error:" + err)
  }
})

router.all('/', (req, res, next) => {
  res.status(405).send("Method Not Allowed")
})

export default router
