// src/routes/index.js
const express = require('express')
const {
  login,
  getContacts,
  getConversation
} = require('../controllers/blipController')

const router = express.Router()

// Rota de login para autenticar a chave API
router.post('/login', login)

// Rota para obter contatos paginados
router.get('/contacts', getContacts)

// Rota para obter a conversa de um contato específico
router.get('/contact/:id/conversation', getConversation)

module.exports = router
