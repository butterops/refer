const express = require('express')
const app = express()
const port = 3002

app.get('/status', function (req, res) {
  res.send('OK')
})

// POST method route
app.post('/clip', function (req, res) {
  res.send('DONE')
})

var server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// server.close()