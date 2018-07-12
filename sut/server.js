const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const config = require("config")

const posterCRUD = require('./posterCRUD')

const app = express();
const PORT = process.env.PORT || 3005

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use('/posters', posterCRUD)
async function start() {
  return new Promise((res, rej) => {
    console.log("starting server")
    app.listen(PORT, function () {
      console.log(`Server listening on port ${PORT}!`);
      res()
    });
  })
}

app.get('/kill', async (req, res) => {
  process.exit(0)
})


module.exports = start
