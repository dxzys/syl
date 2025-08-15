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
    res.render('index', { extractedText: undefined })
})
// POST /parse -> handle PDF/pasted text
app.post('/parse', upload.single('syllabusFile'), async (req, res) => {
    try {
        let extractedText = ''

        if (req.file) {
            // File uploaded
            if (req.file.mimetype === 'application/pdf') {
                const dataBuffer = fs.readFileSync(req.file.path)
                const pdfData = await pdfParse(dataBuffer)
                extractedText = pdfData.text
            } else {
                return res.send('Only PDF files are supported right now.')
            }
        } else if (req.body.syllabusText && req.body.syllabusText.trim()) {
            // Text pasted in textarea
            extractedText = req.body.syllabusText.trim()
        }
        // Debug log
        console.log('Extracted text:', extractedText.slice(0, 200) + '...')

        // Send text back to the frontend
        res.render('index', { extractedText });
    } catch (error) {
        console.error('Error parsing file:', error)
        res.status(500).send('Error processing syllabus.')
    }
})

// POST /generate
app.post('/generate', (req, res) => {
    res.send('ICS generation not implemented yet.')
})

// > Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
