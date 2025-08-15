const express = require('express')

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log('Server running at port ${port}')
})
