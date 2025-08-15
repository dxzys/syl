const express = require('express')
const multer = require('multer')
const path = require('path')

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.render('index')
})

// > Middleware
app.use(express.urlencoded({ extended: true })) // Parse form
app.use(express.json()) // Parse JSON
app.use(express.static(path.join(__dirname, 'public'))) // Static files

// Use EJS as view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// File uploads (multer)
const upload = multer({ dest: 'uploads/' })

// > Routes
// GET / -> Upload form
app.get('/', (req, res) => {
    res.render('index')
})
// POST /parse
app.post('/parse', upload.single('syllabusFile'), (req, res) => {
    console.log('Uploaded file:', req.file)
    console.log('Pasted text:', req.body.syllabusText)
    console.log('Start date:', req.body.startDate)
    console.log('End date:', req.body.endDate)
    res.send('Parsing not implemented yet.')
})
// POST /generate
app.post('/generate', (req, res) => {
    res.send('ICS generation not implemented yet.')
})

// > Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
