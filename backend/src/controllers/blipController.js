// src/controllers/blipController.js
const {
  validateApiKey,
  fetchContacts,
  fetchConversation
} = require('../services/blipService')

// Rota de login - Validação da chave API
const login = async (req, res) => {
  const { apiKey } = req.body

  try {
    await validateApiKey(apiKey)
    // Aqui você pode salvar o apiKey em uma sessão, banco de dados, etc.
    res.status(200).json({ message: 'Login successful' })
  } catch (error) {
    res.status(401).json({ message: 'Invalid API key' })
  }
}

// Rota para obter contatos paginados
const getContacts = async (req, res) => {
  const { apiKey, page = 1, pageSize = 10 } = req.query

  try {
    const contacts = await fetchContacts(apiKey, page, pageSize)
    res.status(200).json(contacts)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching contacts', error: error.message })
  }
}

// Rota para obter conversa de um contato
const getConversation = async (req, res) => {
  const { apiKey } = req.query
  const { id } = req.params

  try {
    const conversation = await fetchConversation(apiKey, id)
    res.status(200).json(conversation)
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching conversation', error: error.message })
  }
}

module.exports = {
  login,
  getContacts,
  getConversation
}
