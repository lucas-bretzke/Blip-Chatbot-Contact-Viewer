// src/index.js
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const routes = require('./routes')

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Definir as rotas
app.use('/', routes)

app.listen(port, () => {
  console.log(`Backend is running on http://localhost:${port}`)
})
