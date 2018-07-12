const route = require('express').Router();
const db = require('./db/index')
route.get('/:posterId', async (req, res) => {
  if (!req.params.posterId) {
    res.status(400).send("Invalid Poster Id")
  }
  const purpose = req.query.for || "CUSTOMER_ACCESS"
  //console.log(`GET /poster/${req.params.posterId} for ${purpose}`)
  if (!["CUSTOMER_ACCESS", "QUALITY_ASSURANCE", "RENDER"].includes(purpose)) {
    res.status(404).send("Unknown Purpose")
  }
  const poster = await db.poster.findOne({
    where: {
      posterId: req.params.posterId
    },
    purpose: purpose
  })
  if (poster !== null) {
    res.status(200).send(uniformPoster(poster))
  }
  else {
    res.status(404).send("Not Found")
  }
})

route.post('/create', async (req, res) => {
  try {
    const poster = uniformPoster(req.body)
    const ans = await db.poster.create(poster, {
      purpose: "SAVE"
    })
    res.status(201).send({
      id: ans.posterId
    })
  }
  catch (e) {
    console.error(e)
    res.status(400).send(e.getMessage())
  }
})

route.put('/:posterId', async (req, res) => {
  try {
    if (!req.params.posterId) {
      res.status(400).send("Invalid Poster Id")
    }
    const posterDao = await db.poster.findOne({ where: { posterId: req.params.posterId}, purpose: "SAVE"})
    if (posterDao === undefined) {
      res.status(404).send("Poster not found")
    }
    await posterDao.update(req.body)
    res.status(200).send("updated")
  }
  catch (e) {
    console.error(e)
    res.status(500).send("Internal Server Error")
  }
})

// Posters in the editor have a coords array containing all info, while posters in the db have a lat and a long field
function uniformPoster(poster) {
  if (poster == undefined) {
    return poster
  }
  if (Array.isArray(poster)) {
    return poster.map(p => uniformPoster(p))
  }

  if (Array.isArray(poster.coords)) {
    poster.lat = poster.coords[0]
    poster.long = poster.coords[1]
  }
  else {
    poster.setDataValue('coords', [poster.lat, poster.long])
  }
  return poster
}
module.exports = route
