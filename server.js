const express = require('express')
const router = require('./src/routers')

const app = express()

// port yang digunakan untuk start
const port = 5000

// digunakan untuk menampilkan isi post data
app.use(express.json())

// get
app.use('/api/dumbgram/v1/', router)


app.listen(port, () => console.log(`yaur server running on port ${port}`))