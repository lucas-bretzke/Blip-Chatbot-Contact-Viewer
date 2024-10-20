// backend/src/index.js
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()
const port = 3001 // Porta para o backend

app.use(cors()) // Permite comunicação com o front-end
app.use(express.json())

// Rota de login - Validação da chave API do Blip
app.post('/login', async (req, res) => {
  const { apiKey } = req.body

  try {
    // Valida a chave na API do Blip
    const response = await axios.get('https://http.msging.net/commands', {
      headers: {
        Authorization: `Key ${apiKey}`
      }
    })

    // Se a chave for válida, responde com sucesso
    res.status(200).json({ message: 'Login successful' })
  } catch (error) {
    // Caso de erro, responde com a falha
    res.status(401).json({ message: 'Invalid API key' })
  }
})

// Rota para obter contatos paginados
app.get('/contacts', async (req, res) => {
  const { apiKey, page, pageSize } = req.query

  try {
    const response = await axios.get('https://http.msging.net/commands', {
      headers: {
        Authorization: `Key ${apiKey}`
      },
      params: {
        method: 'get',
        uri: `/contacts?page=${page}&pageSize=${pageSize}`
      }
    })

    res.status(200).json(response.data)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts' })
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
