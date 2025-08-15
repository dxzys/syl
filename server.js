const express = require('express')

const app = express()
const port = 3000

app.get('/', (reeq, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log('Server running at port ${port}')
})
